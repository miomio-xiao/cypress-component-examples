import {
  defineComponent,
  getCurrentInstance,
  ref,
  Ref,
  UnwrapRef,
  watch,
} from 'vue';
import { renderIcon } from './icon';
import './index.css';

const getNumberList = (num: number) => {
  return Array.from({ length: num }).map((_, i) => i + 1);
};

const useRateClasses = ({
  currentValue,
  currentOverValue,
  index,
}: {
  currentValue: Ref<number>;
  currentOverValue: Ref<number>;
  index: number;
}) => {
  return [
    'mio-rate-item',
    (currentOverValue.value || currentValue.value) >= index ? 'is-active' : '',
  ];
};

const useVModel = <T extends { modelValue: T['modelValue'] }>(props: T) => {
  const { emit } = getCurrentInstance();

  const proxy = ref(props.modelValue);

  watch(proxy, (value) => {
    emit('update:modelValue', value);
  });

  watch(
    () => props.modelValue,
    (value) => {
      proxy.value = value as UnwrapRef<T['modelValue']>;
    },
  );

  return proxy;
};

export default defineComponent({
  name: 'Rate',
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
  },

  setup(props) {
    const currentValue = useVModel(props);
    const onClickItem = (index: number) => (currentValue.value = index);

    const currentOverValue = ref(0);

    const renderRateItem = (index: number) => (
      <div
        class={useRateClasses({ currentValue, currentOverValue, index })}
        onClick={() => onClickItem(index)}
        onMouseenter={() => (currentOverValue.value = index)}
        onMouseleave={() => (currentOverValue.value = 0)}
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
