<script lang="ts">
import { computed, defineComponent, Ref, ref, toRefs, watch } from 'vue'
import moment from 'moment'
import { Order } from '../../interfaces/order'

export default defineComponent({
  setup(context, { emit }) {
    const { orders } = toRefs(context)

    watch(orders, (oldVal, newVal) => {
      filterDesc()
    })

    const idCounter: Ref<number> = ref(1)

    const handleDetail = async (order: Order) => {
      emit('handleDetail', order)
    }
    const handleStatus = async (order: Order) => {
      emit('handleStatus', order)
    }

    const filterAsc = () => {
      orders.value = orders.value.sort((a, b) => a.order_id - b.order_id)
    }
    const filterDesc = () => {
      orders.value = orders.value.sort((a, b) => b.order_id - a.order_id)
    }

    const filterById = () => {
      idCounter.value++
      if (idCounter.value === 1) filterDesc()
      if (idCounter.value === 2) filterAsc()
      if (idCounter.value === 3) {
        filterDesc()
        idCounter.value = 1
      }
    }

    filterDesc()
    return {
      moment,
      handleDetail,
      handleStatus,
      filterById,
      orders,
    }
  },

  props: {
    orders: { type: Array as () => Array<Order>, required: true },
  },
})
</script>

<template>
  <div class="md:bg-white shadow-sm rounded-md">
    <table class="mb-4">
      <thead>
        <tr class="text-gray-500 font-semibold">
          <th class="cursor-pointer" @click="filterById">{{ $t('table_id') }}</th>
          <th class="cursor-default">{{ $t('table_delivery') }}</th>
          <th class="cursor-pointer" @click="filterById">{{ $t('order_date') }}</th>
          <th class="cursor-default">{{ $t('table_price') }}</th>
          <th class="cursor-default">Status</th>
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
            {{ order.delivery ? $t('table_yes') : $t('table_no') }}
          </td>
          <td data-label="Date" @click="handleDetail(order)">
            {{ moment(order.delivery_date).format('DD/MM - HH:mm') }}
          </td>
          <td data-label="Price" @click="handleDetail(order)">
            € {{ order.price }}
          </td>
          <td data-label="Status" class="flex justify-end md:justify-center">
            <p
              class="
                rounded-md
                w-32
                transition
                hover:scale-105
                ease-out
                duration-300
                flex
                justify-center
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
