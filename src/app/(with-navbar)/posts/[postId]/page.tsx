import { getPost } from '@/lib/server-actions/post';
import DOMPurify from 'isomorphic-dompurify';
import Prism from 'prismjs';
import * as cheerio from 'cheerio';
import 'prismjs/themes/prism.css';
import { decode } from 'html-entities';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';
import Image from 'next/image';
import EditButton from '../../_components/EditButton';

export default async function PostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const post = await getPost(postId);

  if (!post.data?.content) {
    return <div>Post not found</div>;
  }

  // HTML 파싱
  const $ = cheerio.load(post.data.content);

  // TinyMCE codesample이 생성한 코드 블록 찾기
  const $codes = $('pre[class*="language-"] code');

  if ($codes.length > 0) {
    $codes.each(function () {
      const $code = $(this);
      const $pre = $code.parent('pre');

      // 언어 추출 (pre 태그의 class에서)
      const classAttr = $pre.attr('class') || '';
      const langMatch = classAttr.match(/language-(\w+)/);
      const language = langMatch ? langMatch[1] : 'javascript';

      // HTML entities 디코딩 (< > & 등)
      const code = decode($code.html() || '');

      // Prism으로 하이라이팅
      if (Prism.languages[language]) {
        const highlighted = Prism.highlight(
          code,
          Prism.languages[language],
          language,
        );

        // 하이라이팅된 HTML로 교체
        $code.html(highlighted);
      }
    });
  }

  // 변환된 HTML 추출
  const highlightedContent = $.html();

  // DOMPurify로 sanitize (선택사항)
  // DOMPurify.addHook('uponSanitizeElement', (node, data) => {
  //   // iframe 이면서 src가 지정된 YouTube 주소만 허용
  //   if (data.tagName === 'iframe') {
  //     if (node.src && node.src.startsWith('https://www.youtube.com/embed/')) {
  //       // 허용: 속성 강제 제한
  //       node.setAttribute('allowfullscreen', 'allowfullscreen');
  //       node.removeAttribute('frameborder'); // 필요시 제거
  //     } else {
  //       // YouTube 아니면 삭제
  //       node.parentNode && node.parentNode.removeChild(node);
  //     }
  //   }
  // });

  const sanitizedHTML = DOMPurify.sanitize(highlightedContent, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allowfullscreen', 'width', 'height', 'src'],
  });

  return (
    <>
      <div className="text-3xl md:text-4xl font-semibold mb-[6px]">
        {post.data.title}
      </div>
      <div className="leading-loose mb-[12px]">
        <strong>by {post.data.userUsername} </strong>
        <span className="text-textgray">{`${new Date(post.data.createdAt).toLocaleDateString('en-US', { weekday: 'long' })}, ${new Date(post.data.createdAt).toLocaleDateString('en-US', { month: 'short' })} ${new Date(post.data.createdAt).toLocaleDateString('en-US', { day: 'numeric' })} ${new Date(post.data.createdAt).toLocaleDateString('en-US', { year: 'numeric' })}`}</span>
        <EditButton id={post.data.id} username={post.data.userUsername} />
      </div>
      <blockquote className="border-l-4 border-gray-400 pl-4 italic font-serif leading-loose">
        {post.data.summary}
      </blockquote>
      {/* <div className="border-t w-full border-[0.1px] border-gray mt-[12px]"></div> */}
      <div className="border-t-[1px] border-b-[1px] border-gray h-[74px] pt-[16px] pb-[16px] mt-[16px] mb-[16px] flex flex-row gap-x-[10px]">
        <div className="border-[1px] rounded-[10px] border-gray h-[42px] flex flex-row">
          <div className="w-[42px] h-[42px]">
            <Image
              className="relative top-[5px] left-[5px]"
              src="/Heart.svg"
              alt="like"
              width={30}
              height={30}
            />
          </div>
          <span className="flex flex-col justify-center text-[14px] mr-[8px]">
            64
          </span>
        </div>
        <div className="border-[1px] rounded-[10px] border-gray h-[42px] flex flex-row">
          <div className="w-[42px] h-[42px]">
            <Image
              className="relative top-[6px] left-[8px]"
              src="/Message square.svg"
              alt="reviews"
              width={30}
              height={30}
            />
          </div>
          <span className="flex flex-col justify-center text-[14px] mr-[8px]">
            64
          </span>
        </div>
        <div className="border-[1px] rounded-[10px] border-gray h-[42px] flex flex-row">
          <div className="w-[42px] h-[42px]">
            <Image
              className="relative top-[7px] left-[7px]"
              src="/Share.svg"
              alt="share"
              width={25}
              height={25}
            />
          </div>
          <span className="flex flex-col justify-center text-[14px] mr-[8px]">
            64
          </span>
        </div>
      </div>
      {/* <div className="border-t w-full border-[0.1px] border-gray mb-[12px]"></div> */}
      <div
        className="no-preflight"
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
      />
    </>
  );
}
