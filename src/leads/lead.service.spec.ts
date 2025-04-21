import { Test, TestingModule } from "@nestjs/testing";

import { PrismaService } from "../prisma/prisma.service";
import { RegisterLeadInput } from "./dtos/register-lead.input";
import { ServiceType } from "./entities/lead-service.entity";
import { LeadService } from "./lead.service";

const mockPrismaService = {
  lead: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
};

describe("LeadService", () => {
  let service: LeadService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<LeadService>(LeadService);
    prismaService = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  describe("register", () => {
    it("should register a new lead with services", async () => {
      const input: RegisterLeadInput = {
        name: "Test User",
        email: "test@example.com",
        mobile: "09123456789",
        postcode: "1000",
        services: [ServiceType.DELIVERY, ServiceType.PICK_UP],
      };

      const expectedResult = {
        id: 1,
        name: "Test User",
        email: "test@example.com",
        mobile: "09123456789",
        postcode: "1000",
        createdAt: new Date(),
        services: [
          { id: 1, type: ServiceType.DELIVERY },
          { id: 2, type: ServiceType.PICK_UP },
        ],
      };

      mockPrismaService.lead.create.mockResolvedValue(expectedResult);

      const result = await service.register(input);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.lead.create).toHaveBeenCalledWith({
        data: {
          ...input,
          services: {
            create: input.services.map((type) => ({ type })),
          },
        },
        include: {
          services: true,
        },
      });
    });

    it("should handle errors when registering a lead", async () => {
      const input: RegisterLeadInput = {
        name: "Test User",
        email: "test@example.com",
        mobile: "09123456789",
        postcode: "1000",
        services: [ServiceType.DELIVERY],
      };

      const error = new Error("Database error");
      mockPrismaService.lead.create.mockRejectedValue(error);

      await expect(service.register(input)).rejects.toThrow("Database error");
      expect(mockPrismaService.lead.create).toHaveBeenCalled();
    });
  });

  describe("findAll", () => {
    it("should return an array of leads with services", async () => {
      const expectedResult = [
        {
          id: 1,
          name: "Test User 1",
          email: "test1@example.com",
          mobile: "09123456789",
          postcode: "1000",
          createdAt: new Date(),
          services: [{ id: 1, type: ServiceType.DELIVERY }],
        },
        {
          id: 2,
          name: "Test User 2",
          email: "test2@example.com",
          mobile: "09123456780",
          postcode: "2000",
          createdAt: new Date(),
          services: [{ id: 2, type: ServiceType.PICK_UP }],
        },
      ];

      mockPrismaService.lead.findMany.mockResolvedValue(expectedResult);

      const result = await service.findAll();

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.lead.findMany).toHaveBeenCalledWith({
        include: { services: true },
      });
    });
  });

  describe("findOne", () => {
    it("should return a single lead with services when it exists", async () => {
      const leadId = 1;
      const expectedResult = {
        id: leadId,
        name: "Test User",
        email: "test@example.com",
        mobile: "09123456789",
        postcode: "1000",
        createdAt: new Date(),
        services: [{ id: 1, type: ServiceType.DELIVERY }],
      };

      mockPrismaService.lead.findUnique.mockResolvedValue(expectedResult);

      const result = await service.findOne(leadId);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.lead.findUnique).toHaveBeenCalledWith({
        where: { id: leadId },
        include: { services: true },
      });
    });

    it("should return null when lead does not exist", async () => {
      const leadId = 999;
      mockPrismaService.lead.findUnique.mockResolvedValue(null);

      const result = await service.findOne(leadId);

      expect(result).toBeNull();
      expect(mockPrismaService.lead.findUnique).toHaveBeenCalledWith({
        where: { id: leadId },
        include: { services: true },
      });
    });
  });
});
