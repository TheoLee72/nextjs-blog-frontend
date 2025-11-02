import Image from 'next/image';
import EmailButton from '../_components/EmailButton';
export default function AboutPage() {
  return (
    <>
      <div className="w-full h-[74px]"></div>
      <p className="text-[24px]">About Me: Theo Lee</p>
      <p className="text-[16px] mt-[10px]">
        Welcome to my personal blog! I’m Theo Lee, a Computer Science and
        Engineering student at Seoul National University (SNU), and this is
        where I document my journey in programming and my thoughts on the tech
        industry.
      </p>
      <p className="text-[16px] mt-[10px]">
        Currently, I serve in the Republic of Korea Air Force (ROKAF) as an
        Information Security Specialist(정보보호병), gaining invaluable
        experience in securing digital assets.
      </p>
      <p className="text-[24px] mt-[20px]">Tech Stack & Interests</p>
      <p className="text-[16px] mt-[10px]">
        My primary passion lies in Web Development, and my blog itself is a
        hands-on showcase, built using Next.js for the <a href="https://github.com/TheoLee72/nextjs-blog-frontend"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue underline">frontend(repo link)</a> and Rust (Axum),
        PostgreSQL, Redis, gRPC, vLLM for the <a href="https://github.com/TheoLee72/rust-axum-blog-project"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue underline">backend(repo link)</a>. I&apos;m actively
        exploring high-performance, modern full-stack development.
      </p>
      <p className="text-[16px] mt-[10px]">
        I am also keenly interested in AI Agent Development. This interest began
        at the Alliance Students’ Venture Forum (ASVF), where my
        teammates(김지수, 김동건, 성재용, 신민규, 엄선우, 차신국) and I
        developed &quot;Fillow,&quot; a product that orchestrates various AI
        APIs into a unified service. </p>
      <video autoPlay muted loop playsInline className="w-full h-full object-cover">
        <source src="/fillow.mp4" type="video/mp4" /></video>
      <p className="text-[16px] mt-[10px]">
        Leveraging this experience, I created an AI
        planner application designed to optimize study schedules for college
        applicants, a project that earned me selection in the U300 Startup
        Competition.
      </p>
      <video autoPlay muted loop playsInline className="w-full h-full object-cover">
        <source src="/aiplanner.mp4" type="video/mp4" /></video>
      <p className="text-[24px] mt-[20px]">What&apos;s Next</p>
      <p className="text-[16px] mt-[10px]">
        My immediate goal is to build an AI Crawler that will intelligently
        curate and select the most useful tech posts from across the internet,
        continuously pulling data and updates in real time to provide my blog
        viewers with a streamlined source of links and information.
      </p>
      <p className="text-[16px] mt-[10px]">
        Please feel free to connect or reach out!
      </p>
      <div className="w-full flex flex-row justify-start mt-[10px] gap-x-[10px] items-center">
        <a
          href="https://github.com/TheoLee72"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/github.svg" alt="github" width={46} height={46}></Image>
        </a>
        <a
          href="https://x.com/endolpin72"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/x.svg" alt="x" width={46} height={46}></Image>
        </a>
        <a
          href="https://www.linkedin.com/in/theo72lee/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/linkedin.svg"
            alt="linkedin"
            width={46}
            height={46}
          ></Image>
        </a>
        <EmailButton />
      </div>
    </>
  );
}
