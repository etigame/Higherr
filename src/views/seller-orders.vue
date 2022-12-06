<template>
    <section class="seller-orders flex">
        <!-- <div class="headline"> -->
        <h1  class="headline">Earnings</h1>
        <!-- </div> -->
        <div class="income-order-dashboard flex">
            <div class="dashboard-item">
                <span>This Year income</span>
                <h3>$26,226</h3>
            </div>
            <div class="dashboard-item">
                <span>This Month Income</span>
                <h3>$26,226</h3>
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
                <h3>{{pendingOrders}}</h3>
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
                    <div class="set-col"><h4>set</h4>
                    <div v-if="setOpen" class="set-status">
                        <button @click="changeStatus('Complete')">Complete</button>
                        <button @click="changeStatus('Pending')">Pending</button>
                        <button @click="changeStatus('On Progress')">On Progress</button>
                        <button @click="changeStatus('Reject')">Reject</button>
                    </div>
                    </div>
                </div>
            <div class="table-entity flex" v-for="order in orders">
                <div class="buyer-col flex user-col">
                    <div class="user-img">
                        <img :src="order.buyer.imgUrl">
                    </div>
                    <div class="username">
                    <p>{{order.buyer.fullname}}</p>
                    </div>
                </div>
                <div class="gig-col flex column">
                    <span>{{order.gig.name}}</span>
                </div>
                <div class="due-on-col flex column">
                    <span>26/12/2022</span>
                </div>
                <div class="total-col flex column">
                    <span>US${{order.gig.price}}</span>
                </div>
                <div class="status-col flex column">
                    <div class="status flex">
                        <span>{{order.status}}</span>
                    </div>
                </div>
                <div class="set-col flex column">
                    <button @click="selectOrder(order)"><span v-icon="'dots'"></span></button>
                    
                </div>
            </div>
            </div>

        
    </section>
</template>

<script>
export default {
    props:["loggedUser"],
    name: 'seller-orders',
    data(){
        return{
            setOpen:false,
            selectedOrder:null,
        }
    },
    created(){
        this.loadOrders()
    },
    methods:{
        loadOrders(){
            return this.$store.dispatch({ type: 'loadOrders' })  
        },
        selectOrder(order){
            console.log(order);
            this.selectedOrder = {...order}
            console.log(this.selectedOrder);
            this.toggleSet()
        },
        toggleSet(){
            this.setOpen=!this.setOpen
        },
        async changeStatus(status){
            this.selectedOrder.status=status
            console.log(this.selectedOrder);
            this.toggleSet()
           await this.$store.dispatch({ type: 'saveOrder', order: this.selectedOrder }) 
            this.loadOrders()
        },
    },
computed: {
    // orders() {
    //     const orders = this.$store.getters.orders
    //       const filteredOrders = orders.filter(
    //           (order) => order.seller._id === this.loggedUser._id)
    //     return filteredOrders
    // },
    orders() {
        return this.$store.getters.orders
    },
    annualIncome(){
        
    },
    pendingOrders(){
        var pending = 0
        this.orders.forEach(order => {
            if(order.status==="Pending"){pending++}
        })
        console.log(this.orders);
        return pending

    },
},
}
</script>