import { BiCrown } from "react-icons/bi";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { RiLeafLine } from "react-icons/ri";

export default function Numbers() {
  return (
    <section id="numbers" className="py-10 w-full">
      <div className="max-w-267.5 w-full mx-auto px-6">
        <div>
          <div className="text-[32px] max-md:text-[24px] text-brand-dark text-center mb-8 font-bold">
            Start growing with Summarist now
          </div>
          <div className="grid grid-cols-3 max-md:grid-cols-1 gap-10 max-md:gap-6">
            <div className="bg-brand-blue-light flex flex-col items-center text-center p-6 pb-10 rounded-xl">
              <div className="flex items-center h-15 gap-1 text-brand-blue-accent [&>svg]:w-12 [&>svg]:h-12">
                <BiCrown />
              </div>
              <div className="text-10 max-md:text-[32px] text-brand-dark font-semibold mb-4">
                3 Million
              </div>
              <div className="text-brand-text font-light max-md:text-[14px]">
                Downloads on all platforms
              </div>
            </div>
            <div className="bg-brand-blue-light flex flex-col items-center text-center p-6 pb-10 rounded-xl">
              <div className="flex items-center h-15 gap-1 text-brand-blue-accent [&>svg]:w-5 [&>svg]:h-5">
                <BsStarFill />
                <BsStarHalf />
              </div>
              <div className="text-10 max-md:text-[32px] text-brand-dark font-semibold mb-4">
                4.5 Stars
              </div>
              <div className="text-brand-text font-light max-md:text-[14px]">
                Average ratings on iOS and Google Play
              </div>
            </div>
            <div className="bg-brand-blue-light flex flex-col items-center text-center p-6 pb-10 rounded-xl">
              <div className="flex items-center h-15 gap-1 text-brand-blue-accent [&>svg]:w-12 [&>svg]:h-12">
                <RiLeafLine />
              </div>
              <div className="text-10 max-md:text-[32px] text-brand-dark font-semibold mb-4">
                97%
              </div>
              <div className="text-brand-text font-light max-md:text-[14px]">
                Of Summarist members create a better reading habit
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
