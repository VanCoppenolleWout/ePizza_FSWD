<script lang="ts">
import { defineComponent } from 'vue'
import moment from 'moment'
import { Order } from '../../interfaces/order'

export default defineComponent({
  setup(context, { emit }) {
    const handleDetail = async (order: Order) => {
      emit('handleDetail', order)
    }
    const handleStatus = async (order: Order) => {
      emit('handleStatus', order)
    }
    return {
      moment,
      handleDetail,
      handleStatus,
    }
  },

  props: {
    orders: { type: Array as () => Array<Order> },
  },
})
</script>

<template>
  <div class="md:bg-white shadow-sm rounded-md">
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
          class="
            text-gray-500
            cursor-pointer
            transform
            transition
            ease-out
            duration-300
            hover:scale-[101%]
            mb-4
          "
          style=""
          v-for="(order, index) in orders"
          :key="index"
        >
          <td data-label="Order ID" @click="handleDetail(order)">
            #{{ order.order_id }}
          </td>
          <td data-label="Delivery" @click="handleDetail(order)">
            {{ order.delivery ? 'yes' : 'no' }}
          </td>
          <td data-label="Date" @click="handleDetail(order)">
            {{ moment(order.delivery_date).format('DD/MM - hh:mm a') }}
          </td>
          <td data-label="Price" @click="handleDetail(order)">
            €{{ order.price }}
          </td>
          <td data-label="Status" class="flex justify-center">
            <p
              class="
                rounded-md
                w-1/2
                transition
                hover:scale-105
                ease-out
                duration-300
              "
              :class="
                order.status === 'completed'
                  ? 'bg-green-100 text-green-900'
                  : order.status === 'processing'
                  ? 'bg-yellow-100 text-yellow-600'
                  : 'bg-red-100 text-red-600'
              "
              @click="handleStatus(order)"
            >
              {{ order.status }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
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
    font-size: 16px;
    text-align: left;
  }
}
</style>
