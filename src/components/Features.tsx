import { AiFillFileText, AiFillBulb, AiFillAudio } from "react-icons/ai";

export default function Features() {
  return (
    <section id="features" className="py-10 w-full">
      <div className="max-w-267.5 w-full mx-auto px-6">
        <div>
          <div className="text-[32px] max-md:text-[24px] text-brand-dark text-center mb-8 font-bold">
            Understand books in few minutes
          </div>
          <div className="grid grid-cols-3 max-md:grid-cols-1 gap-10 mb-24">
            <div className="flex flex-col items-center text-center">
              <div className="flex justify-center mb-2 text-brand-dark [&>svg]:w-15 [&>svg]:h-15 max-md:[&>svg]:w-12 max-md:[&>svg]:h-12">
                <AiFillFileText />
              </div>
              <div className="text-[24px] max-md:text-5 text-brand-dark mb-4 font-medium">
                Read or listen
              </div>
              <div className="text-[18px] max-md:text-[14px] text-brand-text font-light">
                Save time by getting the core ideas from the best books.
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex justify-center mb-2 text-brand-dark [&>svg]:w-15 [&>svg]:h-15 max-md:[&>svg]:w-12 max-md:[&>svg]:h-12">
                <AiFillBulb />
              </div>
              <div className="text-[24px] max-md:text-5 text-brand-dark mb-4 font-medium">
                Find your next read
              </div>
              <div className="text-[18px] max-md:text-[14px] text-brand-text font-light">
                Explore book lists and personalized recommendations.
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex justify-center mb-2 text-brand-dark [&>svg]:w-15 [&>svg]:h-15 max-md:[&>svg]:w-12 max-md:[&>svg]:h-12">
                <AiFillAudio />
              </div>
              <div className="text-[24px] max-md:text-5 text-brand-dark mb-4 font-medium">
                Briefcasts
              </div>
              <div className="text-[18px] max-md:text-[14px] text-brand-text font-light">
                Gain valuable insights from briefcasts
              </div>
            </div>
          </div>

          <div className="flex max-md:flex-col gap-20 max-md:gap-8 mb-24 max-md:mb-8">
            <div className="w-full flex flex-col justify-center">
              <div className="text-[32px] max-md:text-[24px] font-medium text-brand-muted mb-4">
                Enhance your knowledge
              </div>
              <div className="text-[32px] max-md:text-[24px] font-medium text-brand-muted mb-4">
                Achieve greater success
              </div>
              <div className="text-[32px] max-md:text-[24px] font-medium text-brand-muted mb-4">
                Improve your health
              </div>
              <div className="text-[32px] max-md:text-[24px] font-medium text-brand-muted mb-4">
                Develop better parenting skills
              </div>
              <div className="text-[32px] max-md:text-[24px] font-medium text-brand-muted mb-4">
                Increase happiness
              </div>
              <div className="text-[32px] max-md:text-[24px] font-medium text-brand-muted">
                Be the best version of yourself!
              </div>
            </div>
            <div className="w-full flex flex-col justify-center gap-6 bg-brand-gray-light p-[40px_24px]">
              <div className="flex gap-4">
                <div className="text-brand-blue-accent text-5 font-semibold mt-1">
                  93%
                </div>
                <div className="text-5 max-md:text-4 font-light text-brand-text">
                  of Summarist members <b>significantly increase</b> reading
                  frequency.
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-brand-blue-accent text-5 font-semibold mt-1">
                  96%
                </div>
                <div className="text-5 max-md:text-4 font-light text-brand-text">
                  of Summarist members <b>establish better</b> habits.
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-brand-blue-accent text-5 font-semibold mt-1">
                  90%
                </div>
                <div className="text-5 max-md:text-4 font-light text-brand-text">
                  have made <b>significant positive</b> change to their lives.
                </div>
              </div>
            </div>
          </div>

          <div className="flex max-md:flex-col gap-20 max-md:gap-8">
            <div className="w-full flex flex-col justify-center gap-6 bg-brand-gray-light p-[40px_24px] max-md:order-1">
              <div className="flex gap-4">
                <div className="text-brand-blue-accent text-5 font-semibold mt-1">
                  91%
                </div>
                <div className="text-5 max-md:text-4 font-light text-brand-text">
                  of Summarist members <b>report feeling more productive</b>{" "}
                  after incorporating the service into their daily routine.
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-brand-blue-accent text-5 font-semibold mt-1">
                  94%
                </div>
                <div className="text-5 max-md:text-4 font-light text-brand-text">
                  of Summarist members have <b>noticed an improvement</b> in
                  their overall comprehension and retention of information.
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-brand-blue-accent text-5 font-semibold mt-1">
                  88%
                </div>
                <div className="text-5 max-md:text-4 font-light text-brand-text">
                  of Summarist members <b>feel more informed</b> about current
                  events and industry trends since using the platform.
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col justify-center max-md:items-start">
              <div className="text-[32px] max-md:text-[24px] font-medium text-brand-muted mb-4">
                Expand your learning
              </div>
              <div className="text-[32px] max-md:text-[24px] font-medium text-brand-muted mb-4">
                Accomplish your goals
              </div>
              <div className="text-[32px] max-md:text-[24px] font-medium text-brand-muted mb-4">
                Strengthen your vitality
              </div>
              <div className="text-[32px] max-md:text-[24px] font-medium text-brand-muted mb-4">
                Become a better caregiver
              </div>
              <div className="text-[32px] max-md:text-[24px] font-medium text-brand-muted mb-4">
                Improve your mood
              </div>
              <div className="text-[32px] max-md:text-[24px] font-medium text-brand-muted">
                Maximize your abilities
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
