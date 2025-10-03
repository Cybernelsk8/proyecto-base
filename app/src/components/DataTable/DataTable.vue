<script setup>
import axios from 'axios'
import { onClickOutside } from '@vueuse/core'
import { ref, computed, onMounted } from 'vue'

import Table from '../Table.vue'
import LoadingBar from '../LoadingBar.vue'
import { formatVal, getNestedValue, handleError } from '@/helpers'


// -------------PROPERTIES--------------

const search = ref('')
const startIndex = ref(1)
const endIndex = ref(1)
const currentPage = ref(1)
const rowsPerPage = ref(10)
const searchables = []
const sortColumn = ref(null)
const sortDir = ref('asc')
const sortType = ref(false)
const loadingExportData = ref(false)
const selectedRows = ref([])
const selectAll = ref(null)
const openFilterOptions = ref(false)
const filters = ref([{ field: '', value: '', operator : '=' }])
const target = ref(null)

const emit = defineEmits(['selectedRows'])

const props = defineProps({
    headers: {
        type : Array,
        default : () => [],
        required : true,
    },
    data: {
        type : Array,
        default : () => [],
        required : true,
    },
    loading: {
        type: Boolean,
        default: false
    },
    excel: {
        type: Boolean,
        default: true
    },
    pdf: {
        type: Boolean,
        default: true
    },
    filterAdvance: {
        type: Boolean,
        default: true
    },

    multiple: {
        type : Boolean,
        default : true
    },

    itemsSelected: {
        type: Array,
        default: () => []
    },

    rowsPerPage: {
        type: Number,
        default: 10
    }
})


// -------------COMPUTATED--------------


props.headers.map(el => {
    searchables.push(el.key.toLowerCase().trim())
})


const data = computed(() => props.data)


const isDate = (value) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(value) && !isNaN(parseDate(value));
}

// Función para convertir una fecha en formato DD/MM/YYYY a un objeto Date
const parseDate = (value) => {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day)
}

const filteredData = computed(() => {
    currentPage.value = 1;
    const searchTerms = search.value.toLowerCase().trim().split(';').map(term => term.trim());

    return sortedItems.value.filter((item) => {
        return filters.value.every((filter) => {
            if (filter.field && filter.value) {
                const values = filter.value.split(';').map(value => value.trim().toLowerCase());
                const itemValue = String(getNestedValue(item, filter.field)).toLowerCase();

                return values.some(value => {
                    if (!isNaN(itemValue) && !isNaN(value)) {
                        // Comparación numérica
                        const itemNumber = parseFloat(itemValue);
                        const filterNumber = parseFloat(value);
                        switch (filter.operator) {
                            case '>':
                                return itemNumber > filterNumber;
                            case '<':
                                return itemNumber < filterNumber;
                            case '=':
                                return itemNumber === filterNumber;
                            default:
                                return false;
                        }
                    } else if (isDate(itemValue) && isDate(value)) {
                        // Comparación de fechas
                        const itemDate = parseDate(itemValue);
                        const filterDate = parseDate(value);
                        switch (filter.operator) {
                            case '>':
                                return itemDate > filterDate;
                            case '<':
                                return itemDate < filterDate;
                            case '=':
                                return itemDate.getTime() === filterDate.getTime();
                            default:
                                return false;
                        }
                    } else {
                        // Comparación de texto
                        switch (filter.operator) {
                            case '>':
                                return itemValue > value;
                            case '<':
                                return itemValue < value;
                            case '=':
                                return itemValue.toLowerCase().includes(value);
                            default:
                                return false;
                        }
                    }
                });
            }
            return true;
        }) && searchTerms.every((searchTerm) => {
            return searchables.some((column) => {
                const value = getNestedValue(item, column);
                return String(value).toLowerCase().includes(searchTerm);
            });
        });
    });
}, { cache: true })

const paginatedData = computed(() => {
    startIndex.value = (currentPage.value - 1) * rowsPerPage.value
    endIndex.value = parseInt(startIndex.value) + parseInt(rowsPerPage.value)
    return filteredData.value.slice(startIndex.value, endIndex.value)
})

const totalPages = computed(() => Math.ceil(filteredData.value.length / rowsPerPage.value))

const setCurrentPage = (page) => {
    currentPage.value = page
}

const sortedItems = computed(() => {
    if (sortColumn.value) {
        return data.value.sort((a, b) => {

            if (sortType.value == 'numeric') {
                const valA = Number(getNestedValue(a, sortColumn.value))
                const valB = Number(getNestedValue(b, sortColumn.value))
                return sortDir.value === 'asc' ? valA - valB : valB - valA
            }

            const valA = String(getNestedValue(a, sortColumn.value))
            const valB = String(getNestedValue(b, sortColumn.value))
            return sortDir.value === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA)

        });
    }
    return data.value
})

const displayedPages = computed(() => {

    const totalDisplayedPages = 6
    const halfDisplayedPages = Math.floor(totalDisplayedPages / 2)
    let startPage = Math.max(currentPage.value - halfDisplayedPages, 1)
    let endPage = Math.min(startPage + totalDisplayedPages - 1, totalPages.value)

    if (endPage - startPage + 1 < totalDisplayedPages) {
        startPage = Math.max(endPage - totalDisplayedPages + 1, 1)
    }

    return Array(endPage - startPage + 1).fill().map((_, index) => startPage + index)
})


// -------------METHODS--------------


const sort = (column, type) => {

    sortType.value = type

    if (sortColumn.value === column) {
        sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortColumn.value = column;
        sortDir.value = 'asc';
    }

}

const resetPage = () => {
    currentPage.value = 1
}



const selectRow = () => {
    emit('selectedRows', selectedRows.value)
}

const allSelectedRows = () => {
    if (selectAll.value.checked) {
        selectedRows.value = paginatedData.value
    } else {
        selectedRows.value = []
    }
    emit('selectedRows', selectedRows.value)
}

const exportData = async () => {

    loadingExportData.value = true

    try {

        const response = await axios.post('exportar-excel',
            {
                columns: props.headers,
                data: filteredData.value
            },
            {
                responseType: 'blob'
            })

        const url = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'export.xlsx')

        document.body.appendChild(link)
        link.click();

        window.URL.revokeObjectURL(url)
        document.body.removeChild(link)


    } catch (error) {
        handleError(error);
    } finally {

        loadingExportData.value = false
    }
}

const addFilter = () => {
    filters.value.push({ field: '', value: '', operator : '=' })
}

const removeFilter = (index) => {
    if (index != 0) {
        delete (filters.value.splice(index, 1))
    }
}

onClickOutside(target, (event) => openFilterOptions.value = false)

onMounted(() => {
    
    selectedRows.value = props.itemsSelected
    if(props.rowsPerPage) {
        rowsPerPage.value = props.rowsPerPage
    }

});

</script>

<template>
    <section class="px-4 lg:px-7 grid gap-4">
        <!-- FILTER -->
        <div class="md:flex md:items-center md:justify-between">
            <div class="inline-flex items-center px-2 py-1.5 gap-2">
                <span>Mostrar</span>
                <select 
                    v-model="rowsPerPage" 
                    @change="resetPage"
                    class="dark:bg-gray-900 cursor-pointer text-center w-full focus:outline-none ring-0">

                    <option>5</option>
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>

                </select>
                <span>registros</span>
            </div>
            <div class="flex items-center gap-2">

                <Input icon="search" type="search" placeholder="Buscar ..." v-model="search" />

                <div class="flex gap-2">
                    <!-- FILTER ADVANCE -->
                    <Drop-Down icon="filter" variant="btn-primary">
                        <div class="max-w-xs">
                            <div class="flex justify-center py-1">
                                <button @click="addFilter"
                                    class="text-xs flex items-center gap-1 cursor-pointer active:scale-95 hover:font-bold ">
                                    <Icon icon="fas fa-plus" class="text-green-500 " />
                                    Agregar
                                </button>
                            </div>
                            <div v-for="(item, index) in filters" class="flex items-center gap-2 text-xs">
                                <select class="uppercase dark:bg-gray-700 select-normal" v-model="item.field">
                                    <option v-for="head in props.headers" :value="head.key">
                                            {{ head.title }}
                                    </option>
                                </select>

                                <select class=" dark:bg-gray-700 select-normal" v-model="item.operator">
                                    <option value="=" selected> = </option>
                                    <option value=">">{{ `>` }}</option>
                                    <option value="<">{{ `<` }}</option>
                                </select>

                                <input type="search" class="select-normal" v-model="item.value">

                                <Icon v-if="index != 0" @click="removeFilter(index)" icon="fas fa-xmark" class="text-red-500 hover:scale-110 cursor-pointer" />
                            </div>
                        </div>
                    </Drop-Down>
                    <!-- END FILTER ADVANCE -->
                    
                    <Button v-if="props.excel && data.length > 0" @click="exportData" icon="file-excel" class="btn-green"  :loading="loadingExportData" />
                    <Button v-if="props.pdf && data.length > 0" icon="file-pdf" class="btn-red" :loading="loadingExportData" />
                    
                </div>
            </div>
        </div>
        <!-- END FILTER -->

        <!-- MOBILE CARDS -->
        <div class="grid gap-4 lg:hidden py-4">
            <div v-for="item in paginatedData" :key="item.id" class=" dark:bg-gray-800 p-2 rounded-xl ">
                <table class="w-full">
                    <tr>
                        <td v-if="props.multiple" > 
                            <input class="checkbox" type="checkbox" @change="selectRow" v-model="selectedRows" :value="item"> 
                        </td>
                    </tr>
                    <tr v-for="head in props.headers" class="hover:bg-gray-700 rounded-lg">
                        <td 
                            class="px-4 font-semibold uppercase text-sm select-none" 
                            :width="head.width" 
                            align="left" 
                            :hidden="head.hidden" >

                            <p>{{ head.title }}</p>

                        </td>
                        <td 
                            :align="head.align ?? 'center'" 
                            :width="head.width" 
                            :hidden="head.hidden">

                            <slot :name="head.key" :item="item">
                                <p :class="head.class ?? 'text-sm'">
                                    {{ formatVal(getNestedValue(item, head.key), head.type) }}
                                </p>
                            </slot>

                        </td>
                    </tr>
                </table>
            </div>
        </div>

        <!-- END MOBILE CARDS -->

        <!-- TABLE -->
        <Table class="invisible lg:visible">
            <template #thead>
                <tr>
                    <th v-if="props.multiple">
                        <input class="checkbox" type="checkbox" ref="selectAll" @change="allSelectedRows" title="All selected rows">
                    </th>
                    <th 
                        v-for="(head, index) in props.headers" 
                        :key="index" 
                        @click="sort(head.key, head.type)" 
                        scope="col" 
                        :width="head.width" 
                        :align="head.align ?? 'left'" 
                        :hidden="head.hidden">
                        <div class="flex gap-1">
                            <span v-if="sortColumn === head.key">
                                {{ sortDir === 'asc' ? '▲' : '▼' }}
                            </span>
                            {{ head.title }}
                        </div>
                    </th>
                </tr>
            </template>
            <template #tbody>
                <slot name="tbody" :items="paginatedData">
                    <tr v-for="item in paginatedData" 
                        :key="item.id" 
                        class="dark:hover:bg-gray-800 hover:bg-gray-200 select-none">

                        <td v-if="props.multiple" > 
                            <input class="checkbox" type="checkbox" @change="selectRow" v-model="selectedRows" :value="item"> 
                        </td>

                        <td 
                            v-for="(head, index) in props.headers"  
                            :align="head.align ?? 'left'" 
                            :width="head.width" 
                            :key="index" 
                            :hidden="head.hidden">
                            <slot :name="head.key" :item="item">
                                <p :class="head.class ?? 'uppercase text-xs dark:text-gray-300'">
                                    {{ formatVal(getNestedValue(item, head.key), head.type) }}
                                </p>
                            </slot>
                        </td>
                    </tr>
                </slot>
                <tr v-if="props.loading">
                    <td align="center" :colspan="props.headers.length" class="px-10">
                        <LoadingBar class="h-1 bg-color-4" />
                        <span class="animate-ping">Cargando data ....</span>
                    </td>
                </tr>
                <tr v-if="data.length === 0 && props.loading === false">
                    <td align="center" :colspan="props.headers.length">
                        No hay data ....
                    </td>
                </tr>
            </template>
        </Table>
        <!-- END TABLE -->

        <!-- PAGINATION -->
        <div class="flex items-center justify-between pb-4">
            <!-- RESPONSIVE MOBILE BUTTONS -->
            <div v-show="filteredData.length >= rowsPerPage && displayedPages.length > 1" class="flex flex-1 justify-between md:hidden">
                <a @click="(currentPage == 1) ? currentPage = 1 : currentPage--"
                    class="relative flex items-center rounded border border-gray-300 select-none cursor-pointer btn px-4 py-2 text-sm font-medium" >
                    Anterior
                </a>
                <a @click="(currentPage == totalPages) ? currentPage = totalPages : currentPage++"
                    class="relative ml-3 flex items-center rounded border border-gray-300 select-none cursor-pointer btn px-4 py-2 text-sm font-medium" >
                    Siguiente
                </a>
            </div>

            <div class="hidden md:flex md:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p class="text-xs text-color-4">
                        Mostrando
                        <span class="font-medium">{{ startIndex + 1 }}</span>
                        a
                        <span class="font-medium">{{ (endIndex >= filteredData.length) ? filteredData.length : endIndex
                            }}</span>
                        de
                        <span class="font-medium">{{ filteredData.length }}</span>
                        resultados
                    </p>
                </div>
                <div v-if="itemsSelected.length > 0">
                    <p class="text-xs text-color-4">
                        Seleccionados
                        <span class="font-medium">{{ itemsSelected.length }}</span>
                        de
                        <span class="font-medium">{{ filteredData.length }}</span>
                    </p>
                </div>
                <div v-show="filteredData.length >= rowsPerPage && displayedPages.length > 1">
                    <nav class="flex gap-x-2">
                        <a v-if="currentPage > 4" @click="setCurrentPage(1)"
                            class="cursor-pointer relative flex items-center px-3 py-1.5 font-semibold text-color-4 rounded-full hover:bg-gray-200">
                            <Icon icon="fas fa-angles-left" class="text-xs" />
                        </a>
                        <a v-if="currentPage > 1" @click="(currentPage == 1) ? currentPage = 1 : currentPage--"
                            class="cursor-pointer relative flex items-center px-3 py-1.5 text-sm font-semibold text-color-4 rounded-full hover:bg-gray-200">
                            <span class="sr-only">Previous</span>
                            <Icon icon="fas fa-angle-left" class="text-xs" />

                        </a>
                        <a :class="page === currentPage ? ' z-10 ' : ''"
                            v-for="page in displayedPages" :key="page" @click="setCurrentPage(page)"
                            class="cursor-pointer select-none relative flex items-center px-3 py-1.5 text-color-4 text-sm font-semibold rounded-full hover:bg-gray-200 hover:text-color-4">
                            {{ page }}
                        </a>
                        <a v-if="currentPage < (totalPages - 1)"
                            @click="(currentPage == totalPages) ? currentPage = totalPages : currentPage++"
                            class="cursor-pointer relative flex items-center px-3 py-1.5 text-sm font-semibold text-color-4 rounded-full hover:bg-gray-200"
                            >
                            <span class="sr-only">Next</span>
                            <Icon icon="fas fa-angle-right" class="text-xs" />
                        </a>
                        <a v-if="currentPage < (totalPages - 2)" @click="setCurrentPage(totalPages)"
                            class="cursor-pointer relative flex items-center px-3 py-1.5 font-semibold text-color-4 rounded-full hover:bg-gray-200">
                            <Icon icon="fas fa-angles-right" class="text-xs" />
                        </a>
                    </nav>
                </div>
            </div>
        </div>
        <!-- END PAGINATION -->

    </section>
</template>

<style scoped>
    @reference 'tailwindcss';

    td {
        @apply text-gray-800 dark:text-gray-300 px-6 py-4;
    }

    th {
        @apply font-semibold uppercase px-6 py-3;
    }

    .select-normal {
        @apply border border-gray-300 rounded-lg px-2 py-1 outline-none cursor-pointer;
    }

    .checkbox {
        @apply h-4 w-4 cursor-pointer;
    }
</style>
