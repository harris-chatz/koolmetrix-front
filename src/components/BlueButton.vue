<!-- Blue button -->
<template>
    <button
        class="b-button b-blue"
        @click="click()"
    >
        <span>{{ htmlText }}</span>
    </button>
</template>

<script>

import { computed } from 'vue';
import { StringHelper } from '@bryntum/grid';

export default {
    name  : 'BlueButton',
    props : ['record', 'clickHandler'],

    setup(props) {
        const htmlText = computed(() => {
            return StringHelper.encodeHtml(props.record.city);
        });

        function click() {
            props.clickHandler(this.htmlText, 'b-blue');
        }

        return {
            click,
            htmlText
        };
    }
};
</script>
