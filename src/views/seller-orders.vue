<template>
    <section class="seller-orders flex">
        <!-- <div class="headline"> -->
        <h1  class="headline">Earnings</h1>
        <!-- </div> -->
        <div class="income-order-dashboard flex">
            <div class="dashboard-item">
                <span>This Year income</span>
                <h3>$ 26,226</h3>
            </div>
            <div class="dashboard-item">
                <span>This Month Income</span>
                <h3>$ 26,226</h3>
            </div>
            <div class="dashboard-item">
                <span>This Year Orders Completed</span>
                <h3>226</h3>
            </div>
            <div class="dashboard-item">
                <span>This Year income</span>
                <h3>26</h3>
            </div>
            <div class="dashboard-item">
                <span>Order Pending</span>
                <h3>3</h3>
            </div>
        </div>

            <h2 class="headline">Manage Orders</h2>
            <div class="order-table">
                <div class="table-head flex">
                    <div class="buyer-col"><h4>Buyer</h4></div>
                    <div class="gig-col"><h4>Gig</h4></div>
                    <div class="due-on-col"><h4>Due On</h4></div>
                    <div class="total-col"><h4>Total</h4></div>
                    <div class="status-col"><h4>status</h4></div>
                </div>
            <div class="table-entity flex" v-for="i in 5">
                <div class="buyer-col flex user-col">
                    <div class="user-img">
                        <img :src="`https://randomuser.me/api/portraits/${randomGender}/${randomNum}.jpg`">
                    </div>
                    <div class="username">
                    <p>PukiJa</p>
                    </div>
                </div>
                <div class="gig-col flex column">
                    <span>lorem ipsum puki is the king of CASERP wtf?!</span>
                </div>
                <div class="due-on-col flex column">
                    <span>26/12/2022</span>
                </div>
                <div class="total-col flex column">
                    <span>226$</span>
                </div>
                <div class="status-col flex column">
                    <div class="status flex">
                        <span>Completed</span>
                    </div>
                </div>
            </div>
            </div>

        
    </section>
</template>

<script>
import { utilService } from '../services/util-service.js'
export default {
    name: 'seller-orders',
computed: {
    randomNum() {
        return utilService.getRandomIntInclusive(1, 99)
    },
    randomGender() {
        return Math.random() > 0.5 ? 'women' : 'men'
    }
},
}
</script>