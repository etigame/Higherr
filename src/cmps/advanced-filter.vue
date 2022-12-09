<template>
    <section class="advanced-filter main-layout full">
            <!-- <div class="advanced-input">
                <button class="clear-filter-btn" @click="clearAllFilter">Clear Filter</button>
                <el-select v-model="filterBy.category" @change="filter()" class="m-2 category-input" placeholder="Category"
                    size="large">
                    <el-option v-for="item in options" :label="item.label" :value="item.value" />
                </el-select>
        
        
                <div @click="toggleBudget" class="budget-input-1 flex">
                    <span>Budget</span>
                    <form @submit.prevent="filterBudget()" v-if="budgetDrop" v-clickOutside="toggleBudget"
                        class="budget-dropdown">
                        <div @click.stop class="inputs">
                            <div>
                                <p>MIN</p>
                                <input v-model.number="filterBy.min" />
                            </div>
                            <div>
                                <p>MAX</p>
                                <input v-model.number="filterBy.max" />
                            </div>
                        </div>
                        <div @click.stop class="buttons flex">
                            <div @click.stop="clearBudget()">Clear All</div>
                            <button>Apply</button>
                        </div>
                    </form>
                </div>
        
                <el-select @change="filter()" class="m-2 delivery-input" v-model="filterBy.delivery" placeholder="Delivery Time"
                    size="large">
                    <el-option value="1" v-model="filterBy.delivery">Express 24H</el-option>
                    <el-option value="3" v-model="filterBy.delivery">Up to 3 days</el-option>
                    <el-option value="7" v-model="filterBy.delivery">Up to 7 days</el-option>
                    <el-option value="" v-model="filterBy.delivery">Anytime</el-option>
                </el-select>
            </div>
        
            <div class="advanced-switches">
                <div class="pro-switch"><el-switch v-model="demoInfo" class="ml-2"
                        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #dadbdd" />
                    <h4>Pro service</h4>
                </div>
                <div class="online-switch"><el-switch v-model="demoInfo" class="ml-2"
                        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #dadbdd" />
                    <h4>Online seller</h4>
                </div>
            </div> -->
    </section>
</template>

<script>
export default {
    name: 'advanced-filter'
}
</script>