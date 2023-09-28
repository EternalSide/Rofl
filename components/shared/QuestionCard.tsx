interface Props {
  title: string;
}

const QuestionCard = ({ title }: Props) => {
  return (
    <div className="w-full dark-gradient h-[209px] rounded-[10px] px-[45px] py-[36px]">
      <h3 className="text-light-900 h3-semibold max-w-[618px] w-full">{title}</h3>
    </div>
  );
};
export default QuestionCard;
