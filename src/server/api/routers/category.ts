import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.category.findMany({
        where: {
          userId: ctx?.session?.user?.id
        },
        orderBy: {
          id: 'asc'
        }
      })
    } catch (error) {
      console.log("Error", error);
    }
  }),
  getSelected: protectedProcedure.query(async ({ ctx }) => {
    try {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user?.id,
        }
      })

      if (!user?.selectedCategoryId) return null

      const selectedCategoryId = user.selectedCategoryId

      return ctx.prisma.category.findUnique({
        where: {
          id: selectedCategoryId
        }
      })
    } catch (error) {
      console.log("Error", error);
    }
  }),
  create: protectedProcedure.input(
    z.object({
      name: z.string(),
      fragments: z.string()
    })
  ).mutation(({ ctx, input }) => {
    try {
      return ctx.prisma.category.create({
        data: {
          name: input?.name,
          userId: ctx?.session?.user?.id,
          fragments: input?.fragments
        }
      })
    } catch (error) {
      console.log("Error", error);
    }
  }),
  update: protectedProcedure.input(
    z.object({
      name: z.string(),
      fragments: z.string(),
      categoryId: z.number()
    })
  ).mutation(({ ctx, input }) => {
    try {
      return ctx.prisma.category.update({
        where: {
          id: input.categoryId
        },
        data: {
          name: input.name,
          fragments: input.fragments
        }
      })
    } catch (error) {
      console.log("Error", error);
    }
  }),
  select: protectedProcedure.input(
    z.object({
      categoryId: z.number()
    })
  ).mutation(({ ctx, input }) => {
    try {
      return ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id
        },
        data: {
          selectedCategoryId: input.categoryId
        }
      })
    } catch (error) {
      console.log("Error", error);
    }
  })
})