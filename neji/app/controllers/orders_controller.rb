class OrdersController < ApplicationController
  before_action :set_order, only: [:show, :update, :destroy]

  # GET /orders
  def index
    @orders = Order.all

    render json: @orders
  end

  # GET /orders/1
  def show
    render json: @order
  end

  # POST /orders
  def create
    @order = Order.new(order_params)

    if @order.save
      Message::MessageService::send_message(@order.address_attributes, 'order')

      render json: { status: 'success' }, status: :created, location: @order
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /orders/1
  def update
    update_order_address_attributes

    if @order.update
      render json: @order
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  # DELETE /orders/1
  def destroy
    @order.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_order
      @order = Order.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def order_params
      params.permit(
        user_info: [
          :phone,
          :name,
          :email,
        ],
        address_attributes: [
          :city,
          :neighborhood,
          :street,
          :uf,
          :zip_code,
        ],
        request_info: [
          :question1,
          :question2,
          :question3,
        ],
      )
    end

    def update_order_address_attributes
      @order.address_attributes[:lat] = params[:address_attributes][:lat]
      @order.address_attributes[:lng] = params[:address_attributes][:lng]
    end
end
