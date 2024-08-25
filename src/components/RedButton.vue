<!-- Red button -->
<template>
    <button
        class="b-button b-red"
        @click="click()"
    >
        <span>{{ htmlText }}</span>
    </button>
</template>

<script>

import { computed } from 'vue';
import { StringHelper } from '@bryntum/grid';

export default {
    name  : 'RedButton',
    props : ['record', 'clickHandler'],

    setup(props) {
        const htmlText = computed(() => {
            return StringHelper.encodeHtml(props.record.city);
        });

        function click() {
            props.clickHandler(this.htmlText, 'b-red');
        }

        return {
            click,
            htmlText
        };
    }
};
</script>
