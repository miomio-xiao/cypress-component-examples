import { defineComponent, ref, Ref } from 'vue';
import { renderIcon } from './icon';
import './index.css';

const getNumberList = (num: number) => {
  return Array.from({ length: num }).map((_, i) => i + 1);
};
function useRateClasses({
  currentValue,
  index,
}: {
  currentValue: Ref<number>;
  index: number;
}) {
  return ['mio-rate-item', currentValue.value >= index ? 'is-active' : ''];
}

export default defineComponent({
  name: 'Rate',

  setup() {
    const currentValue = ref(0);
    const onClickItem = (index: number) => (currentValue.value = index);

    const renderRateItem = (index: number) => (
      <div
        class={useRateClasses({ currentValue, index })}
        onClick={() => onClickItem(index)}
      >
        {renderIcon()}
      </div>
    );
    const renderRate = () => (
      <div class='mio-rate'>
        {getNumberList(5).map((i) => renderRateItem(i))}
      </div>
    );

    return () => renderRate();
  },
});
