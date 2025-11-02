export default async function EmailConfirmRequestPage({
  params,
}: {
  params: Promise<{ address: string }>;
}) {
  const { address } = await params;
  return (
    <>
      <div className="font-semibold text-[32px] h-[72px] flex flex-col justify-center">
        Confirm your email
      </div>
      <div className="font-semibold text-[14px] h-[267px] flex flex-col justify-start mt-[24px] leading-loose">
        We’ve sent you a confirmation link. <br />
        Please check your email
        <br />
        &quot;{decodeURIComponent(address)}&quot;.
      </div>
      <div className="border-t w-full border-[1px] border-gray mt-[16px]"></div>
    </>
  );
}
