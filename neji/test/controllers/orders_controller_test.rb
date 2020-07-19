require 'test_helper'

class OrdersControllerTest < ActionDispatch::IntegrationTest
  test "should create order and save in the database" do
    assert_difference('Order.count') do
      post orders_url, params: order_request_params, as: :json
    end

    order = Order.first

    assert_response 201
    assert_equal order_request_params[:user_info], order.user_info.symbolize_keys
    assert_equal order_request_params[:address_attributes], order.address_attributes.symbolize_keys
    assert_equal order_request_params[:request_info], order.request_info.symbolize_keys
  end

  test "should return 400 when request it is invalid" do
    post orders_url, params: {}, as: :json

    order = Order.first

    assert_response 400
  end

  test "should update order and save in the database" do
    order = Order.new(order_request_params)
    order.save

    patch order_url(order), params: order_update_params, as: :json

    assert_response 200

    order_updated = Order.last

    assert_equal order_request_params[:user_info], order_updated.user_info.symbolize_keys
    assert_equal expect_update_address_attributes, order_updated.address_attributes.symbolize_keys
    assert_equal order_request_params[:request_info], order_updated.request_info.symbolize_keys
  end

  test "should not update order when request is invalid" do
    order = Order.new(order_request_params)
    order.save

    patch order_url(order), params: {}, as: :json

    assert_response 400
  end

  def order_request_params
    {
      user_info: {
        phone: "(11) 98765-4321",
        name: "João da Silva",
        email: "joao_silva@exemplo.com",
      },
      address_attributes: {
        city: "São Paulo",
        neighborhood: "Jardim Paulista",
        street: "Avenida São Gabriel",
        uf: "SP",
        zip_code: "01435-001",
      },
      request_info: {
        question1: "answer1",
        question2: "answer2",
        question3: "answer3",
      }
    }
  end

  def order_update_params
    {
      address_attributes: {
        lat: "-25.5071164",
        lng: "-49.3246856",
      }
    }
  end

  def expect_update_address_attributes
    {
      city: "São Paulo",
      neighborhood: "Jardim Paulista",
      street: "Avenida São Gabriel",
      uf: "SP",
      zip_code: "01435-001",
      lat: "-25.5071164",
      lng: "-49.3246856",
    }
  end
end
