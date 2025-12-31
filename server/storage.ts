import { conversions, type Conversion, type InsertConversion } from "@shared/schema";

export interface IStorage {
  // We can track conversions in memory
  createConversion(conversion: InsertConversion): Promise<Conversion>;
  getConversion(id: number): Promise<Conversion | undefined>;
}

export class MemStorage implements IStorage {
  private conversions: Map<number, Conversion>;
  private currentId: number;

  constructor() {
    this.conversions = new Map();
    this.currentId = 1;
  }

  async createConversion(insert: InsertConversion): Promise<Conversion> {
    const id = this.currentId++;
    const conversion: Conversion = {
      ...insert,
      id,
      message: insert.message || null,
      createdAt: new Date()
    };
    this.conversions.set(id, conversion);
    return conversion;
  }

  async getConversion(id: number): Promise<Conversion | undefined> {
    return this.conversions.get(id);
  }
}

export const storage = new MemStorage();
