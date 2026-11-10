import { AiFillFileText, AiFillBulb, AiFillAudio } from "react-icons/ai";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { BiCrown } from "react-icons/bi";
import { RiLeafLine } from "react-icons/ri";

export default function Home() {
  return (
    <div className="max-w-[100%] overflow-x-hidden font-roboto text-brand-text">
      {/* NAVBAR */}
      <nav className="h-[80px]">
        <div className="flex justify-between items-center max-w-[1070px] w-full h-full mx-auto px-6">
          <figure className="max-w-[200px]">
            <img className="w-full h-full" src="/assets/logo.png" alt="logo" />
          </figure>
          <ul className="flex gap-6">
            <li className="cursor-pointer text-brand-dark hover:text-brand-primary transition-colors duration-100">
              Login
            </li>
            <li className="cursor-not-allowed text-brand-dark transition-colors duration-100 max-[576px]:hidden">
              About
            </li>
            <li className="cursor-not-allowed text-brand-dark transition-colors duration-100 max-[576px]:hidden">
              Contact
            </li>
            <li className="cursor-not-allowed text-brand-dark transition-colors duration-100 max-[576px]:hidden">
              Help
            </li>
          </ul>
        </div>
      </nav>

      {/* LANDING */}
      <section id="landing" className="py-10 w-full">
        <div className="max-w-[1070px] w-full mx-auto px-6">
          <div>
            <div className="flex max-md:flex-col max-md:items-center max-md:text-center max-md:max-w-[540px] max-md:mx-auto">
              <div className="w-full">
                <div className="text-brand-dark text-[40px] max-md:text-[24px] font-bold mb-6">
                  Gain more knowledge <br className="max-md:hidden" />
                  in less time
                </div>
                <div className="text-brand-text text-[20px] font-light mb-6 leading-[1.5]">
                  Great summaries for busy people,
                  <br className="max-md:hidden" />
                  individuals who barely have time to read,
                  <br className="max-md:hidden" />
                  and even people who don’t like to read.
                </div>
                <button className="bg-brand-primary hover:bg-brand-primary-hover active:translate-y-[1px] text-brand-dark w-full h-[40px] rounded-[4px] text-[16px] transition-colors duration-200 flex items-center justify-center min-w-[180px] max-w-[300px] max-md:mx-auto">
                  Login
                </button>
              </div>
              <figure className="w-full flex justify-end max-md:hidden">
                <img
                  src="/assets/landing.png"
                  alt="landing"
                  className="w-full h-full max-w-[400px]"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-10 w-full">
        <div className="max-w-[1070px] w-full mx-auto px-6">
          <div>
            <div className="text-[32px] max-md:text-[24px] text-brand-dark text-center mb-8 font-bold">
              Understand books in few minutes
            </div>
            <div className="grid grid-cols-3 max-md:grid-cols-1 gap-10 mb-24">
              <div className="flex flex-col items-center text-center">
                <div className="flex justify-center mb-2 text-brand-dark [&>svg]:w-[60px] [&>svg]:h-[60px] max-md:[&>svg]:w-[48px] max-md:[&>svg]:h-[48px]">
                  <AiFillFileText />
                </div>
                <div className="text-[24px] max-md:text-[20px] text-brand-dark mb-4 font-medium">
                  Read or listen
                </div>
                <div className="text-[18px] max-md:text-[14px] text-brand-text font-light">
                  Save time by getting the core ideas from the best books.
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex justify-center mb-2 text-brand-dark [&>svg]:w-[60px] [&>svg]:h-[60px] max-md:[&>svg]:w-[48px] max-md:[&>svg]:h-[48px]">
                  <AiFillBulb />
                </div>
                <div className="text-[24px] max-md:text-[20px] text-brand-dark mb-4 font-medium">
                  Find your next read
                </div>
                <div className="text-[18px] max-md:text-[14px] text-brand-text font-light">
                  Explore book lists and personalized recommendations.
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex justify-center mb-2 text-brand-dark [&>svg]:w-[60px] [&>svg]:h-[60px] max-md:[&>svg]:w-[48px] max-md:[&>svg]:h-[48px]">
                  <AiFillAudio />
                </div>
                <div className="text-[24px] max-md:text-[20px] text-brand-dark mb-4 font-medium">
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
                  <div className="text-brand-blue-accent text-[20px] font-semibold mt-1">
                    93%
                  </div>
                  <div className="text-[20px] max-md:text-[16px] font-light text-brand-text">
                    of Summarist members <b>significantly increase</b> reading
                    frequency.
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-brand-blue-accent text-[20px] font-semibold mt-1">
                    96%
                  </div>
                  <div className="text-[20px] max-md:text-[16px] font-light text-brand-text">
                    of Summarist members <b>establish better</b> habits.
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-brand-blue-accent text-[20px] font-semibold mt-1">
                    90%
                  </div>
                  <div className="text-[20px] max-md:text-[16px] font-light text-brand-text">
                    have made <b>significant positive</b> change to their lives.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex max-md:flex-col gap-20 max-md:gap-8">
              <div className="w-full flex flex-col justify-center gap-6 bg-brand-gray-light p-[40px_24px] max-md:order-1">
                <div className="flex gap-4">
                  <div className="text-brand-blue-accent text-[20px] font-semibold mt-1">
                    91%
                  </div>
                  <div className="text-[20px] max-md:text-[16px] font-light text-brand-text">
                    of Summarist members <b>report feeling more productive</b>{" "}
                    after incorporating the service into their daily routine.
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-brand-blue-accent text-[20px] font-semibold mt-1">
                    94%
                  </div>
                  <div className="text-[20px] max-md:text-[16px] font-light text-brand-text">
                    of Summarist members have <b>noticed an improvement</b> in
                    their overall comprehension and retention of information.
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-brand-blue-accent text-[20px] font-semibold mt-1">
                    88%
                  </div>
                  <div className="text-[20px] max-md:text-[16px] font-light text-brand-text">
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

      {/* REVIEWS */}
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
                  This app has been a <b>game-changer</b> for me! It&apos;s
                  saved me so much time and effort in reading and comprehending
                  books. Highly recommend it to all book lovers.
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
                  <b>concise and accurate summaries</b> of books in a way that
                  is easy to understand. It&apos;s also very user-friendly and
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
                  <b>loves reading but doesn&apos;t have the time</b> to read
                  every book in full, this app is for you! The summaries are
                  thorough and provide a great overview of the book&apos;s
                  content.
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

      {/* NUMBERS */}
      <section id="numbers" className="py-10 w-full">
        <div className="max-w-[1070px] w-full mx-auto px-6">
          <div>
            <div className="text-[32px] max-md:text-[24px] text-brand-dark text-center mb-8 font-bold">
              Start growing with Summarist now
            </div>
            <div className="grid grid-cols-3 max-md:grid-cols-1 gap-10 max-md:gap-6">
              <div className="bg-brand-blue-light flex flex-col items-center text-center p-6 pb-10 rounded-[12px]">
                <div className="flex items-center h-[60px] gap-1 text-brand-blue-accent [&>svg]:w-[48px] [&>svg]:h-[48px]">
                  <BiCrown />
                </div>
                <div className="text-[40px] max-md:text-[32px] text-brand-dark font-semibold mb-4">
                  3 Million
                </div>
                <div className="text-brand-text font-light max-md:text-[14px]">
                  Downloads on all platforms
                </div>
              </div>
              <div className="bg-brand-blue-light flex flex-col items-center text-center p-6 pb-10 rounded-[12px]">
                <div className="flex items-center h-[60px] gap-1 text-brand-blue-accent [&>svg]:w-[20px] [&>svg]:h-[20px]">
                  <BsStarFill />
                  <BsStarHalf />
                </div>
                <div className="text-[40px] max-md:text-[32px] text-brand-dark font-semibold mb-4">
                  4.5 Stars
                </div>
                <div className="text-brand-text font-light max-md:text-[14px]">
                  Average ratings on iOS and Google Play
                </div>
              </div>
              <div className="bg-brand-blue-light flex flex-col items-center text-center p-6 pb-10 rounded-[12px]">
                <div className="flex items-center h-[60px] gap-1 text-brand-blue-accent [&>svg]:w-[48px] [&>svg]:h-[48px]">
                  <RiLeafLine />
                </div>
                <div className="text-[40px] max-md:text-[32px] text-brand-dark font-semibold mb-4">
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

      {/* FOOTER */}
      <footer id="footer" className="bg-brand-gray-light py-10 w-full">
        <div className="max-w-[1070px] w-full mx-auto px-6">
          <div>
            <div className="relative flex max-md:flex-col justify-between text-[14px] max-md:gap-8 mt-8 mb-16">
              <div className="z-10">
                <div className="font-semibold mb-4 text-[18px] text-brand-dark">
                  Actions
                </div>
                <div>
                  <div className="mb-3 leading-none">
                    <a className="text-brand-text text-[14px] cursor-not-allowed">
                      Summarist Magazine
                    </a>
                  </div>
                  <div className="mb-3 leading-none">
                    <a className="text-brand-text text-[14px] cursor-not-allowed">
                      Cancel Subscription
                    </a>
                  </div>
                  <div className="mb-3 leading-none">
                    <a className="text-brand-text text-[14px] cursor-not-allowed">
                      Help
                    </a>
                  </div>
                  <div className="leading-none">
                    <a className="text-brand-text text-[14px] cursor-not-allowed">
                      Contact us
                    </a>
                  </div>
                </div>
              </div>
              <div className="z-10">
                <div className="font-semibold mb-4 text-[18px] text-brand-dark">
                  Useful Links
                </div>
                <div>
                  <div className="mb-3 leading-none">
                    <a className="text-brand-text text-[14px] cursor-not-allowed">
                      Pricing
                    </a>
                  </div>
                  <div className="mb-3 leading-none">
                    <a className="text-brand-text text-[14px] cursor-not-allowed">
                      Summarist Business
                    </a>
                  </div>
                  <div className="mb-3 leading-none">
                    <a className="text-brand-text text-[14px] cursor-not-allowed">
                      Gift Cards
                    </a>
                  </div>
                  <div className="leading-none">
                    <a className="text-brand-text text-[14px] cursor-not-allowed">
                      Authors & Publishers
                    </a>
                  </div>
                </div>
              </div>
              <div className="z-10">
                <div className="font-semibold mb-4 text-[18px] text-brand-dark">
                  Company
                </div>
                <div>
                  <div className="mb-3 leading-none">
                    <a className="text-brand-text text-[14px] cursor-not-allowed">
                      About
                    </a>
                  </div>
                  <div className="mb-3 leading-none">
                    <a className="text-brand-text text-[14px] cursor-not-allowed">
                      Careers
                    </a>
                  </div>
                  <div className="mb-3 leading-none">
                    <a className="text-brand-text text-[14px] cursor-not-allowed">
                      Partners
                    </a>
                  </div>
                  <div className="leading-none">
                    <a className="text-brand-text text-[14px] cursor-not-allowed">
                      Code of Conduct
                    </a>
                  </div>
                </div>
              </div>
              <div className="z-10">
                <div className="font-semibold mb-4 text-[18px] text-brand-dark">
                  Other
                </div>
                <div>
                  <div className="mb-3 leading-none">
                    <a className="text-brand-text text-[14px] cursor-not-allowed">
                      Sitemap
                    </a>
                  </div>
                  <div className="mb-3 leading-none">
                    <a className="text-brand-text text-[14px] cursor-not-allowed">
                      Legal Notice
                    </a>
                  </div>
                  <div className="mb-3 leading-none">
                    <a className="text-brand-text text-[14px] cursor-not-allowed">
                      Terms of Service
                    </a>
                  </div>
                  <div className="leading-none">
                    <a className="text-brand-text text-[14px] cursor-not-allowed">
                      Privacy Policies
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="text-brand-dark font-medium">
                Copyright &copy; 2023 Summarist.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}