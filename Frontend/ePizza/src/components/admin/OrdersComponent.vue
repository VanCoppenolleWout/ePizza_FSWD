<script lang="ts">
import { defineComponent } from 'vue'
import { Order } from '../../interfaces/order'
import moment from 'moment'

export default defineComponent({
  setup() {
    return {
      moment,
    }
  },
  props: {
    orders: { type: Array as () => Array<Order> },
  },
})
</script>

<template>
  <div>
    <div class="bg-white shadow-sm rounded-md">
      <table class="mb-4">
        <thead>
          <tr class="text-gray-500 font-semibold">
            <th>Order ID</th>
            <th>Delivery</th>
            <th>Date</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody class="text-sm">
          <tr
            class="text-gray-500"
            v-for="(order, index) in orders"
            :key="index"
          >
            <td data-label="Order ID" class="">{{ order.order_id }}</td>
            <td data-label="Delivery" class="">{{ order.delivery }}</td>
            <td data-label="Date" class="">
              {{ moment(order.delivery_date).format('DD/MM - hh:mm a') }}
            </td>
            <td data-label="Price" class="">{{ order.price }}</td>
            <td data-label="Status" class="flex justify-center">
              <p
                class="
                  bg-green-100
                  rounded-md
                  w-1/2
                  text-green-900
                  hover:scale-105
                  transition
                  ease-out
                  duration-300
                "
              >
                Completed
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
table {
  width: 100%;
  margin: 0;
  padding: 0;
  border-collapse: collapse;
  border-spacing: 0;
}

table tr {
  padding: 5px;
}

table th,
table td {
  padding: 10px;
  text-align: center;
}

table th {
  font-size: 14px;
  letter-spacing: 1px;
  border-bottom: 1px solid #ddd;
}

@media (max-width: 768px) {
  table thead {
    display: none;
  }
  table,
  table tbody,
  table tr,
  table td {
    display: block;
    width: 100%;
  }
  table tr {
    margin-bottom: 16px;
    background-color: white;
    padding: 16px;
    border-radius: 12px;
  }
  table td {
    text-align: right;
    padding-left: 50%;
    position: relative;
    margin-bottom: 16px;
  }

  table td:before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    width: 50%;
    /* padding-left: 15px; */
    font-size: 16px;
    /* font-weight: bold; */
    text-align: left;
  }
}
</style>
