import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order_item.model";

export default class OrderRepository {
  
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customer_id,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async find(id: string): Promise<Order>{
    const orderModel = await OrderModel.findOne({ where: {id} });

    const orderItemModel = await OrderItemModel.findAll({
      where: {
        order_id: orderModel.id,
      },
    });
    
    const items = orderItemModel.map(item => {
      return new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity
      );
    })

    const order = new Order(orderModel.id, orderModel.customer_id, items);

    return order;
  }
  
  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll();
    const orders = Promise.all(orderModels.map(async (orderModels) => {
      
      const orderItemsModels = await OrderItemModel.findAll({
        where: {
          order_id: orderModels.id,
        },
      });
      const items = orderItemsModels.map(item => {
        return new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        );
      });
      
      let order = new Order(orderModels.id, orderModels.customer_id, items);

      return order;
    }));

    return orders;
  }

}