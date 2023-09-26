import Link from "next/link";
import Image from "next/image";
import RenderTag from "../RenderTag";

const RightSidebar = () => {
	const fakeData = [
		{
			text: "Would it be appropriate to point out an error in another paper during a referee report?",
		},
		{
			text: "How can an airconditioning machine exist?",
		},
		{
			text: "Interrogated every time crossing UK Border as citizen",
		},
		{
			text: "Low digit addition generator",
		},
		{
			text: "What is an example of 3 numbers that do not make up a vector?",
		},
	];
	const fakeDataTags = [
		{
			tagName: "JAVASCRIPT",
			number: "20152+",
		},
		{
			tagName: "Next.js",
			number: "20152+",
		},
		{
			tagName: "React.js",
			number: "20152+",
		},
		{
			tagName: "node.js",
			number: "20152+",
		},
		{
			tagName: "python",
			number: "20152+",
		},
	];
	return (
		<section
			className='background-light900_dark200
        light-border custom-scrollbar sticky right-0 top-0 flex h-screen  
        w-[350px] flex-col overflow-y-auto border-l p-6 pb-12 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden'
		>
			<div>
				<h3 className='h3-bold text-dark200_light900'>Hot Network</h3>
				<div className='mt-7 flex w-full flex-col gap-[30px]'>
					{fakeData.map((item) => (
						<Link
							href={item.text}
							key={item.text}
							className='flex items-center justify-between gap-7'
						>
							<p className='body-medium text-dark500_light700'>{item.text}</p>
							<Image
								src='/assets/icons/chevron-right.svg'
								className='invert-colors'
								width={20}
								height={20}
								alt='Shevron'
							/>
						</Link>
					))}
				</div>
			</div>

			<div className='mt-16'>
				<h3 className='h3-bold text-dark200_light900'>Popular Tags</h3>
				<div className='mt-7 flex flex-col gap-4'>
					{fakeDataTags.map((item) => (
						<RenderTag
							key={item.number}
							_id={item.number}
							name={item.tagName}
							totalQuestions={item.number}
							showCount
						/>
					))}
				</div>
			</div>
		</section>
	);
};
export default RightSidebar;
