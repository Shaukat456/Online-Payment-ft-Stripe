import { Response, Request } from "express";
import dotenv from "dotenv";
import path from "path";
import { handleErrorResponse } from "../utils";
import { stripeConfig } from "../References/stripe";

const stripe = stripeConfig();

export async function listCustomers(req: Request, res: Response) {
  const limit = req.query.limit || 10;

  try {
    const customers = await stripe.customers.list({
      limit,
    });

    res.send({
      data: customers.data,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
}

export async function createCustomer(req: Request, res: Response) {
  const { description } = req.body;

  try {
    if (!description) {
      throw new Error("Description is required.");
    }

    const customer = await stripe.customers.create({
      description,
    });

    const successMessage = "Customer created successfully";
    res.json({
      msg: successMessage,
      data: customer,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
}

export async function updateCustomer(req: Request, res: Response) {
  const { customerId, orderId } = req.params;

  try {
    const customer = await stripe.customers.update(customerId, {
      metadata: {
        order_id: orderId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      customer,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error updating customer" });
  }
}

export async function getCustomer(req: Request, res: Response) {
  const { customerId } = req.params;

  try {
    const customer: any = await stripe.customers.retrieve(customerId);

    if (customer) {
      res.status(200).json({ success: true, customer });
    } else {
      res.status(404).json({ success: false, message: "Customer not found" });
    }
  } catch (error) {
    console.error(error);
    handleErrorResponse(res, error);
  }
}

export async function deleteCustomer(req: Request, res: Response) {
  const { customerId } = req.params;

  try {
    const deletedCustomer = await stripe.customers.del(customerId);

    if (deletedCustomer.deleted) {
      res
        .status(200)
        .json({ success: true, message: "Customer deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Customer not found" });
    }
  } catch (error) {
    console.error(error);
    handleErrorResponse(res, error);
  }
}

export async function searchCustomer(req: Request, res: Response) {
  const { name, id } = req.query;

  try {
    const allCustomers = await stripe.customers.list();
    const filteredCustomers = allCustomers.data.filter((customer: any) => {
      return customer.name === name && customer.id === id;
    });

    res.status(200).json({ success: true, customers: filteredCustomers });
  } catch (error) {
    console.error(error);
    handleErrorResponse(res, error);
  }
}
