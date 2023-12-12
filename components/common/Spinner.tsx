import Icon from './Icon';

export default function Spinner() {
  return (
    <div className="absolute left-0 top-0 mt-[-53px] flex h-full w-full items-center justify-center ">
      <Icon name="spinner" className="aspect-auto w-1/4  animate-spin fill-deepGreen" />
    </div>
  );
}
