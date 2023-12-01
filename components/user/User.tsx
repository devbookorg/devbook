import QuestionsList from './QuestionsList';
import Button from '../common/Button';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { deleteUser } from '@/firebase/users';
import IQuestion from '@/types/questions';

interface Props {
  name: string;
  id: string;
  userPost: IQuestion[];
}

const User = (props: Props) => {
  const { id, name, userPost } = props;
  const router = useRouter();

  return (
    <article className="flex flex-col gap-6 ">
      <section className="flex items-center gap-2">
        <b className="text-lg">{name}</b>님
      </section>
      <QuestionsList questions={userPost} />
      <section className="my-4 flex gap-4">
        <Button
          btnStyle="btn-state-lg"
          styles="flex-1 border-gray text-gray hover:border-red hover:text-red"
          handleClick={() => {
            deleteUser(id).then(() => {
              signOut({ redirect: false }).then(() => {
                router.push('/');
              });
            });
          }}
        >
          탈퇴
        </Button>
        <Button
          btnStyle="btn-state-lg"
          styles="flex-1 border-deepGreen text-deepGreen"
          handleClick={() => {
            signOut({ redirect: false }).then(() => {
              router.push('/');
            });
          }}
        >
          로그아웃
        </Button>
      </section>
    </article>
  );
};

export default User;
