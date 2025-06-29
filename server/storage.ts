import { users, categories, maids, bookings, pages, type User, type InsertUser, type Category, type InsertCategory, type Maid, type InsertMaid, type Booking, type InsertBooking, type Page, type InsertPage } from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Category methods
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: number, category: Partial<InsertCategory>): Promise<Category | undefined>;
  deleteCategory(id: number): Promise<boolean>;
  
  // Maid methods
  getMaids(): Promise<Maid[]>;
  getMaid(id: number): Promise<Maid | undefined>;
  getMaidsByCategory(categoryId: number): Promise<Maid[]>;
  createMaid(maid: InsertMaid): Promise<Maid>;
  updateMaid(id: number, maid: Partial<InsertMaid>): Promise<Maid | undefined>;
  deleteMaid(id: number): Promise<boolean>;
  
  // Booking methods
  getBookings(): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  getBookingByNumber(bookingNumber: string): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: number, status: string, assignedMaidId?: number): Promise<Booking | undefined>;
  deleteBooking(id: number): Promise<boolean>;
  
  // Page methods
  getPages(): Promise<Page[]>;
  getPage(slug: string): Promise<Page | undefined>;
  updatePage(slug: string, page: Partial<InsertPage>): Promise<Page | undefined>;
  
  // Dashboard metrics
  getDashboardMetrics(): Promise<{
    newRequests: number;
    approvedBookings: number;
    canceledBookings: number;
    totalCategories: number;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private maids: Map<number, Maid>;
  private bookings: Map<number, Booking>;
  private pages: Map<string, Page>;
  private currentUserId: number;
  private currentCategoryId: number;
  private currentMaidId: number;
  private currentBookingId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.maids = new Map();
    this.bookings = new Map();
    this.pages = new Map();
    this.currentUserId = 1;
    this.currentCategoryId = 1;
    this.currentMaidId = 1;
    this.currentBookingId = 1;
    
    this.initializeData();
  }

  private initializeData() {
    // Create default admin user
    const adminUser: User = {
      id: this.currentUserId++,
      username: "admin",
      password: "admin123",
      role: "admin"
    };
    this.users.set(adminUser.id, adminUser);

    // Create default categories
    const defaultCategories = [
      { name: "House Cleaning", description: "Professional house cleaning services", icon: "broom" },
      { name: "Babysitting", description: "Trusted childcare services", icon: "baby" },
      { name: "Elderly Care", description: "Compassionate elderly care services", icon: "heart" }
    ];

    defaultCategories.forEach(cat => {
      const category: Category = {
        id: this.currentCategoryId++,
        name: cat.name,
        description: cat.description,
        icon: cat.icon
      };
      this.categories.set(category.id, category);
    });

    // Create default pages
    const defaultPages = [
      {
        slug: "about",
        title: "About Us",
        content: "MaidCare Pro is Garissa's premier maid hiring management platform, connecting households with professional, vetted domestic helpers."
      },
      {
        slug: "contact",
        title: "Contact Us",
        content: "Get in touch with us at Garissa Town Center or call +254 702 123 456"
      }
    ];

    defaultPages.forEach(page => {
      const fullPage = { ...page, id: 1 };
      this.pages.set(page.slug, fullPage);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id, role: "admin" };
    this.users.set(id, user);
    return user;
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  async updateCategory(id: number, updateData: Partial<InsertCategory>): Promise<Category | undefined> {
    const category = this.categories.get(id);
    if (!category) return undefined;
    
    const updated = { ...category, ...updateData };
    this.categories.set(id, updated);
    return updated;
  }

  async deleteCategory(id: number): Promise<boolean> {
    return this.categories.delete(id);
  }

  // Maid methods
  async getMaids(): Promise<Maid[]> {
    return Array.from(this.maids.values());
  }

  async getMaid(id: number): Promise<Maid | undefined> {
    return this.maids.get(id);
  }

  async getMaidsByCategory(categoryId: number): Promise<Maid[]> {
    return Array.from(this.maids.values()).filter(maid => maid.categoryId === categoryId);
  }

  async createMaid(insertMaid: InsertMaid): Promise<Maid> {
    const id = this.currentMaidId++;
    const maid: Maid = { 
      ...insertMaid, 
      id, 
      available: true,
      email: insertMaid.email || null
    };
    this.maids.set(id, maid);
    return maid;
  }

  async updateMaid(id: number, updateData: Partial<InsertMaid>): Promise<Maid | undefined> {
    const maid = this.maids.get(id);
    if (!maid) return undefined;
    
    const updated = { ...maid, ...updateData };
    this.maids.set(id, updated);
    return updated;
  }

  async deleteMaid(id: number): Promise<boolean> {
    return this.maids.delete(id);
  }

  // Booking methods
  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async getBookingByNumber(bookingNumber: string): Promise<Booking | undefined> {
    return Array.from(this.bookings.values()).find(booking => booking.bookingNumber === bookingNumber);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentBookingId++;
    const bookingNumber = `BK${id.toString().padStart(3, '0')}`;
    const booking: Booking = {
      ...insertBooking,
      id,
      bookingNumber,
      status: "pending",
      assignedMaidId: null,
      createdAt: new Date(),
      requirements: insertBooking.requirements || null
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBookingStatus(id: number, status: string, assignedMaidId?: number): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (!booking) return undefined;
    
    const updated = { ...booking, status, assignedMaidId: assignedMaidId || booking.assignedMaidId };
    this.bookings.set(id, updated);
    return updated;
  }

  async deleteBooking(id: number): Promise<boolean> {
    return this.bookings.delete(id);
  }

  // Page methods
  async getPages(): Promise<Page[]> {
    return Array.from(this.pages.values());
  }

  async getPage(slug: string): Promise<Page | undefined> {
    return this.pages.get(slug);
  }

  async updatePage(slug: string, updateData: Partial<InsertPage>): Promise<Page | undefined> {
    const page = this.pages.get(slug);
    if (!page) return undefined;
    
    const updated = { ...page, ...updateData };
    this.pages.set(slug, updated);
    return updated;
  }

  // Dashboard metrics
  async getDashboardMetrics() {
    const bookings = Array.from(this.bookings.values());
    return {
      newRequests: bookings.filter(b => b.status === "pending").length,
      approvedBookings: bookings.filter(b => b.status === "approved" || b.status === "assigned").length,
      canceledBookings: bookings.filter(b => b.status === "canceled").length,
      totalCategories: this.categories.size
    };
  }
}

export const storage = new MemStorage();
