import prisma from "../../core/config/prismaClient";
import type { Request, Response } from "express";

const itemsControllers = {
  // Create
  createItem: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, description } = req.body;
      const newItem = await prisma.items.create({
        data: {
          name,
          description,
        },
      });
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: "Error creating item" });
    }
  },

  // Read
  getAllItems: async (req: Request, res: Response): Promise<void> => {
    try {
      const { page = 1, limit = 10, name, description } = req.query;
      const skip = (Number(page) - 1) * Number(limit);

      const whereClause = {
        ...(name && { name: { contains: name as string } }),
        ...(description && { description: { contains: description as string } }),
      };

      const allItems = await prisma.items.findMany({
        where: whereClause,
        skip,
        take: Number(limit),
        orderBy: {
          createdAt: "desc",
        },
      });

      const totalItems = await prisma.items.count({ where: whereClause });

      res.status(200).json({
        items: allItems,
        totalItems,
        totalPages: Math.ceil(totalItems / Number(limit)),
        currentPage: Number(page),
      });
    } catch (error) {
      res.status(500).json({ error: "Error fetching items" });
    }
  },

  // Read Single
  getItem: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const item = await prisma.items.findUnique({
        where: { id },
      });
      if (item) {
        res.status(200).json(item);
      } else {
        res.status(404).json({ error: "Item not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching item" });
    }
  },

  // Update
  updateItem: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const updatedItem = await prisma.items.update({
        where: { id },
        data: { name, description },
      });

      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: "Error updating item" });
    }
  },

  // Delete
  deleteItem: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await prisma.items.delete({
        where: { id },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Error deleting item" });
    }
  },
};

export default itemsControllers;
