import { BsStarFill } from "react-icons/bs";

export default function Reviews() {
  return (
    <section id="reviews" className="py-10 w-full">
      <div className="max-w-[1070px] w-full mx-auto px-6">
        <div>
          <div className="text-[32px] max-md:text-[24px] text-brand-dark text-center mb-8 font-bold">
            What our members say
          </div>
          <div className="max-w-[600px] mx-auto">
            <div className="bg-brand-yellow p-4 mb-8 rounded-[4px] font-light">
              <div className="text-brand-dark flex gap-2 mb-2">
                <div className="font-bold">Hanna M.</div>
                <div className="flex [&>svg]:w-[16px] [&>svg]:h-[16px] [&>svg]:fill-brand-blue-accent">
                  <BsStarFill />
                </div>
              </div>
              <div className="text-brand-text tracking-[0.3px] leading-[1.4] max-md:text-[14px]">
                This app has been a <b>game-changer</b> for me! It&apos;s saved
                me so much time and effort in reading and comprehending books.
                Highly recommend it to all book lovers.
              </div>
            </div>
            <div className="bg-brand-yellow p-4 mb-8 rounded-[4px] font-light">
              <div className="text-brand-dark flex gap-2 mb-2">
                <div className="font-bold">David B.</div>
                <div className="flex [&>svg]:w-[16px] [&>svg]:h-[16px] [&>svg]:fill-brand-blue-accent">
                  <BsStarFill />
                </div>
              </div>
              <div className="text-brand-text tracking-[0.3px] leading-[1.4] max-md:text-[14px]">
                I love this app! It provides{" "}
                <b>concise and accurate summaries</b> of books in a way that is
                easy to understand. It&apos;s also very user-friendly and
                intuitive.
              </div>
            </div>
            <div className="bg-brand-yellow p-4 mb-8 rounded-[4px] font-light">
              <div className="text-brand-dark flex gap-2 mb-2">
                <div className="font-bold">Nathan S.</div>
                <div className="flex [&>svg]:w-[16px] [&>svg]:h-[16px] [&>svg]:fill-brand-blue-accent">
                  <BsStarFill />
                </div>
              </div>
              <div className="text-brand-text tracking-[0.3px] leading-[1.4] max-md:text-[14px]">
                This app is a great way to get the main takeaways from a book
                without having to read the entire thing.{" "}
                <b>The summaries are well-written and informative.</b>{" "}
                Definitely worth downloading.
              </div>
            </div>
            <div className="bg-brand-yellow p-4 mb-8 rounded-[4px] font-light">
              <div className="text-brand-dark flex gap-2 mb-2">
                <div className="font-bold">Ryan R.</div>
                <div className="flex [&>svg]:w-[16px] [&>svg]:h-[16px] [&>svg]:fill-brand-blue-accent">
                  <BsStarFill />
                </div>
              </div>
              <div className="text-brand-text tracking-[0.3px] leading-[1.4] max-md:text-[14px]">
                If you&apos;re a busy person who{" "}
                <b>loves reading but doesn&apos;t have the time</b> to read every
                book in full, this app is for you! The summaries are thorough
                and provide a great overview of the book&apos;s content.
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="bg-brand-primary hover:bg-brand-primary-hover active:translate-y-[1px] text-brand-dark w-full h-[40px] rounded-[4px] text-[16px] transition-colors duration-200 flex items-center justify-center min-w-[180px] max-w-[300px]">
              Login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}