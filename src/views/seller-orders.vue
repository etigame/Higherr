<template>
    <section class="dashboard flex">
        <section class="profile-progress">
            <div class="profile flex">
                <div class="img-container">
                    <img :src="loggedUser.imgUrl">
                </div>
                <div class="user-desc flex">
                    <div class="profile-item">
                        <p class="regular">Positive Rating</p>
                        <p class="bold">100%</p>
                    </div>
                    <div class="profile-item">
                        <p class="regular">Response Time</p>
                        <p class="bold">1 Hrs.</p>
                    </div>

                </div>
            </div>
            <div class="progress">
                <article class="progress-item">
                    <div class="progress-txt flex">
                        <p class="bold">Response Rate</p>
                        <p>{{ responseRate }}%</p>
                    </div>
                    <el-progress :percentage="responseRate" color="#1dbf73" />
                </article>
                <article class="progress-item">
                    <div class="progress-txt flex">
                        <p class="bold">Orders Completed</p>
                        <p>{{ completedOrderPercent }}%</p>
                    </div>
                    <el-progress :percentage="completedOrderPercent" color="#1dbf73" />
                </article>
                <article class="progress-item">
                    <div class="progress-txt flex">
                        <p class="bold">Delivered on Time</p>
                        <p>{{ deliveredOnTime }}%</p>
                    </div>
                    <el-progress :percentage="deliveredOnTime" color="#1dbf73" />
                </article>
            </div>

        </section>
        <section class="seller-orders flex">
            <div class="income-order-dashboard flex">
                <div class="dashboard-item">
                    <span class="light">Annual Revenue</span>
                    <h3>${{ annualIncome }}</h3>
                </div>
                <div class="dashboard-item">
                    <span class="light">Monthly Revenue</span>
                    <h3>${{ monthIncome }}</h3>
                </div>
                <div class="dashboard-item">
                    <span class="light">Completed Orders </span>
                    <h3>{{ annualOrdersComplete }}</h3>
                </div>

                <div class="dashboard-item">
                    <span class="light">Pending Orders </span>
                    <h3>{{ pendingOrders }}</h3>
                </div>
            </div>

            <h2 class="headline">Manage Orders</h2>
            <div class="order-table">
                <div class="table-head flex">
                    <div class="buyer-col">
                        <h4>Buyer</h4>
                    </div>
                    <div class="gig-col">
                        <h4>Gig</h4>
                    </div>
                    <div class="due-on-col">
                        <h4>Order Date</h4>
                    </div>
                    <div class="total-col">
                        <h4>Total</h4>
                    </div>
                    <div class="status-col">
                        <h4>Status</h4>
                    </div>

                </div>
                <dashboard-article v-for="order in orders" :order="order" :key="order._id" @change="changeStatus"/>
            </div>


        </section>
    </section>
</template>

<script>
import { socketService } from '../services/socket-service'
import dashboardArticle from '../cmps/dashboard-list-article.vue'

export default {
    props: ["loggedUser"],
    name: 'seller-orders',
    components: {
        dashboardArticle,
    },
    data() {
        return {
            selectedOrder: null,
            deliveredOnTime: 95,
            responseRate: 95,
        }
    },
    created() {
        this.loadOrders()
        window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    methods: {
        loadOrders() {
            return this.$store.dispatch({ type: 'loadOrders' })
        },
        selectOrder(order) {
            this.selectedOrder = { ...order }
            this.toggleSet()
        },
        toggleSet() {
            this.setOpen = !this.setOpen
        },
        changeStatus({status,order}) {
            this.selectOrder(order)
            this.selectedOrder.status = status
            console.log(status,order);
            this.$store.dispatch({ type: 'saveOrder', order: this.selectedOrder })
            // this.loadOrders()
            socketService.emit('order-change-status', this.selectedOrder.buyer)
        },
        toLocalTime(time) {
            console.log(time.toLocaleDateString())
            return new Date(time)
        },
    },
    computed: {
        orders() {
            console.log(this.$store.getters.sellerOrders)
            return this.$store.getters.sellerOrders
        },
        annualIncome() {
            var income = 0
            var yearTime = 1000 * 60 * 60 * 24 * 365
            this.orders.forEach(order => {
                if (order.status === "Completed") { income += order.gig.price }
            })
            return income

            // this.orders.forEach(order => {
            //     if (order.status === "Complete" && Date.now() - order.createdAt <= yearTime) { income += order.gig.price }
            // })
            // return income
        },
        monthIncome() {
            var income = 0
            var monthTime = 1000 * 60 * 60 * 24 * 30
            // this.orders.forEach(order => {
            //     if (order.status === "Complete"&& Date.now() - order.createdAt <=monthTime) { income+= order.gig.price }
            // })
            // return income
            this.orders.forEach(order => {
                if (order.status === "Completed") { income += order.gig.price }
            })
            return income

        },
        pendingOrders() {
            var pending = 0
            console.log(this.orders[0])
            this.orders.forEach(order => {
                if (order.status === "Pending") { pending++ }
            })
            return pending

        },
        annualOrdersComplete() {
            var complete = 0
            var yearTime = 1000 * 60 * 60 * 24 * 365
            // this.orders.forEach(order => {
            //     if (order.status === "Complete" && Date.now() - order.createdAt <= yearTime) { complete++ }
            // })
            // return complete

            this.orders.forEach(order => {
                if (order.status === "Completed") { complete++ }
            })
            return complete
        },
        monthOrdersComplete() {
            var complete = 0
            var monthTime = 1000 * 60 * 60 * 24 * 30
            // this.orders.forEach(order => {
            //     if (order.status === "Complete" && Date.now() - order.createdAt <= monthTime){complete++}
            // })
            // return complete

            this.orders.forEach(order => {
                if (order.status === "Complete") { complete++ }
            })
            return complete

        },
        completedOrderPercent() {
            console.log(this.loggedUser)
            return ((this.annualOrdersComplete / this.orders.length) * 100).toFixed(0)
        },
    },
}
</script>