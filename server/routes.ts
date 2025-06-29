import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCategorySchema, insertMaidSchema, insertBookingSchema, insertUserSchema, insertPageSchema } from "@shared/schema";

interface SessionRequest extends Request {
  session: any;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/login", async (req: SessionRequest, res: Response) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // In a real app, you'd use JWT tokens
      req.session.userId = user.id;
      res.json({ user: { id: user.id, username: user.username, role: user.role } });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/logout", (req: SessionRequest, res: Response) => {
    req.session.destroy((err: any) => {
      if (err) {
        return res.status(500).json({ message: "Could not log out" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", async (req: SessionRequest, res: Response) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    
    res.json({ user: { id: user.id, username: user.username, role: user.role } });
  });

  // Middleware to check authentication
  const requireAuth = (req: SessionRequest, res: Response, next: NextFunction) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Authentication required" });
    }
    next();
  };

  // Category routes
  app.get("/api/categories", async (req: Request, res: Response) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.post("/api/categories", requireAuth, async (req: Request, res: Response) => {
    try {
      const validatedData = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(validatedData);
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ message: "Invalid category data" });
    }
  });

  app.put("/api/categories/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertCategorySchema.partial().parse(req.body);
      const category = await storage.updateCategory(id, validatedData);
      
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json(category);
    } catch (error) {
      res.status(400).json({ message: "Invalid category data" });
    }
  });

  app.delete("/api/categories/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteCategory(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json({ message: "Category deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete category" });
    }
  });

  // Maid routes
  app.get("/api/maids", async (req: Request, res: Response) => {
    try {
      const maids = await storage.getMaids();
      res.json(maids);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch maids" });
    }
  });

  app.post("/api/maids", requireAuth, async (req: Request, res: Response) => {
    try {
      const validatedData = insertMaidSchema.parse(req.body);
      const maid = await storage.createMaid(validatedData);
      res.status(201).json(maid);
    } catch (error) {
      res.status(400).json({ message: "Invalid maid data" });
    }
  });

  app.put("/api/maids/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertMaidSchema.partial().parse(req.body);
      const maid = await storage.updateMaid(id, validatedData);
      
      if (!maid) {
        return res.status(404).json({ message: "Maid not found" });
      }
      
      res.json(maid);
    } catch (error) {
      res.status(400).json({ message: "Invalid maid data" });
    }
  });

  app.delete("/api/maids/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteMaid(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Maid not found" });
      }
      
      res.json({ message: "Maid deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete maid" });
    }
  });

  // Booking routes
  app.get("/api/bookings", requireAuth, async (req: Request, res: Response) => {
    try {
      const bookings = await storage.getBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  app.post("/api/bookings", async (req: Request, res: Response) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      res.status(201).json(booking);
    } catch (error) {
      res.status(400).json({ message: "Invalid booking data" });
    }
  });

  app.put("/api/bookings/:id/status", requireAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { status, assignedMaidId } = req.body;
      
      const booking = await storage.updateBookingStatus(id, status, assignedMaidId);
      
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      
      res.json(booking);
    } catch (error) {
      res.status(400).json({ message: "Failed to update booking status" });
    }
  });

  app.get("/api/bookings/search", requireAuth, async (req: Request, res: Response) => {
    try {
      const { bookingNumber } = req.query;
      
      if (!bookingNumber) {
        return res.status(400).json({ message: "Booking number is required" });
      }
      
      const booking = await storage.getBookingByNumber(bookingNumber as string);
      
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to search booking" });
    }
  });

  // Dashboard metrics
  app.get("/api/dashboard/metrics", requireAuth, async (req: Request, res: Response) => {
    try {
      const metrics = await storage.getDashboardMetrics();
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard metrics" });
    }
  });

  // Page routes
  app.get("/api/pages/:slug", async (req: Request, res: Response) => {
    try {
      const page = await storage.getPage(req.params.slug);
      
      if (!page) {
        return res.status(404).json({ message: "Page not found" });
      }
      
      res.json(page);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch page" });
    }
  });

  app.put("/api/pages/:slug", requireAuth, async (req: Request, res: Response) => {
    try {
      const validatedData = insertPageSchema.partial().parse(req.body);
      const page = await storage.updatePage(req.params.slug, validatedData);
      
      if (!page) {
        return res.status(404).json({ message: "Page not found" });
      }
      
      res.json(page);
    } catch (error) {
      res.status(400).json({ message: "Invalid page data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
