import React from 'react';
import Button from '../common/Button';

const tabs = ['작성한 게시물', '좋아요'];

interface Props {
  tab: number;
  handleTab: (n: number) => void;
}
const QuestionsListTab = (props: Props) => {
  const { tab, handleTab } = props;
  return (
    <section>
      <div className="flex">
        {tabs.map((e, i) => (
          <div
            key={e}
            className={
              tab === i
                ? 'flex-1 border-b-2 border-deepGreen'
                : 'flex-1 border-b-2 border-lightGray'
            }
          >
            <Button
              type="button"
              btnStyle="btn-ghost"
              styles="w-full text-sm"
              handleClick={() => handleTab(i)}
            >
              {e}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuestionsListTab;
