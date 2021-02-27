class OrderProductsController < ApplicationController
  def create 
    @order_product = OrderProduct.new(order_product_params)

    if @order_product.save
      render json: { status: 'success'}
    end
  end

  private
  def order_product_params
    params.require(:order_product).permit(:order_id, :product_id)
  end
end
