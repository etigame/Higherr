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
            <!-- <div class="headline"> -->
            <!-- <h1  class="headline">Earnings</h1> -->
            <!-- </div> -->
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
                <!-- <div class="dashboard-item">
                    <span class="light">Monthly Completed Orders </span>
                    <h3>{{ monthOrdersComplete }}</h3>
                </div> -->
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
                        <div v-if="setOpen" class="set-status" v-clickOutside="toggleSet">
                            <div class="completed status " @click="changeStatus('Completed')">Completed</div>
                            <div class="in-progress status" @click="changeStatus('In Progress')">In Progress</div>
                            <div class="rejected status" @click="changeStatus('Rejected')">Rejected</div>
                        </div>
                    </div>

                </div>
                <div class="table-entity flex" v-for="order in orders">
                    <div class="buyer-col flex align-center user-col">
                        <img :src="order.buyer.imgUrl" />
                        <span class="regular">{{ order.buyer.fullname }}</span>

                    </div>
                    <div class="gig-col flex column">
                        <span class="table-span regular">{{ order.gig.name }}</span>
                    </div>
                    <div class="due-on-col flex column">
                        <span class="table-span regular">{{ new Date(order.createdAt).toLocaleDateString() }}</span>
                    </div>
                    <div class="total-col flex column">
                        <span class="table-span regular">US${{ order.gig.price }}</span>
                    </div>
                    <div @click="selectOrder(order)" class="status-col flex column">
                        <!-- <div class=" status flex"> -->
                        <div class=" status flex" :class="className(order.status)">
                            <!-- <div class="status flex"> -->
                            <span class="regular">{{ order.status }}</span>
                        </div>
                    </div>
                    <!-- <div class="set-col flex column">
                    <button @click="selectOrder(order)"><span v-icon="'dots'"></span></button>
                    
                </div> -->
                </div>
            </div>


        </section>
    </section>
</template>

<script>
import { socketService } from '../services/socket-service'

export default {
    props: ["loggedUser"],
    name: 'seller-orders',
    data() {
        return {
            setOpen: false,
            selectedOrder: null,
            deliveredOnTime: 95,
            responseRate: 95,
        }
    },
    created() {
        this.loadOrders()
    },
    methods: {
        loadOrders() {
            return this.$store.dispatch({ type: 'loadOrders' })
        },
        selectOrder(order) {
            console.log(order)
            this.selectedOrder = { ...order }
            console.log(this.selectedOrder)
            this.toggleSet()
        },
        toggleSet() {
            this.setOpen = !this.setOpen
        },
        changeStatus(status) {
            this.selectedOrder.status = status
            console.log(this.selectedOrder)
            this.toggleSet()
            this.$store.dispatch({ type: 'saveOrder', order: this.selectedOrder })
            // this.loadOrders()
            socketService.emit('order-change-status', this.selectedOrder.buyer)
        },
        toLocalTime(time) {
            console.log(time.toLocaleDateString())
            return new Date(time)
        },
        className(str) {
            if (str === 'Pending') return 'pending'
            if (str === 'Completed') return 'completed'
            if (str === 'In Progress') return 'in-progress'
            if (str === 'Rejected') return 'rejected'
        }
    },
    computed: {
        // orders() {
        //     const orders = this.$store.getters.orders
        //       const filteredOrders = orders.filter(
        //           (order) => order.seller._id === this.loggedUser._id)
        //     return filteredOrders
        // },
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
        // className(str){
        //     if(str==='Pending') return 'pending'
        //     if(str==='Completed') return 'completed'
        //     if(str==='In Progress') return 'in-progress'
        //     if(str==='Rejected') return 'rejected'
        // }
    },
}
</script>