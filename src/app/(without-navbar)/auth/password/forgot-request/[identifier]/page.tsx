export default async function ForgotRequestPage({
  params,
}: {
  params: Promise<{ identifier: string }>;
}) {
  const { identifier } = await params;
  return (
    <>
      <div className="font-semibold text-[32px] h-[72px] flex flex-col justify-center">
        Reset mail sent
      </div>
      <div className="font-semibold text-[14px] h-[267px] flex flex-col justify-start mt-[24px] leading-loose">
        We’ve sent you a reset link.
        <br />
        Please check your email
        <br />
        &quot;{decodeURIComponent(identifier)}&quot;.
      </div>
      <div className="border-t w-full border-[1px] border-gray mt-[16px]"></div>
    </>
  );
}
