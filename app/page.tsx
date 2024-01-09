import Image from 'next/image'
import Footer from './footer.tsx'

function Header() {
  return (
    <div className="bg-white p-3">
      <Image
        src="images/hf-sig.png"
        width={196}
        height={41}
        alt="한국주택금융공사"
      />
    </div>
  )
}

function Title() {
  return (
    <div className="text-center lg:text-left lg:ml-10 my-10 px-10">
      <blockquote className="text-2xl font-bold italic text-slate-900">
        HF
        <span className="ml-3 mr-2 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block">
          <span className="relative text-white">Open</span>
        </span>
        <span>
          API
        </span>
        <span className="ml-2">
          온라인전시관
        </span>
    	</blockquote>
    </div>
  )
}

function Item({title, cont, href}) {
  return (
    <a className="bg-white p-5 m-2 lg:w-96" href={href}>
      <p className="text-slate-900 text-2xl font-bold my-4">{title}</p>
      <div>{cont}</div>
    </a>
  )
}

export default function Home() {
  return (
    <>
      <Header/>
      <Title/>
      <div className="w-full p-4 flex flex-col lg:flex-row lg:flex-wrap">
        <Item
          title="HF 전세자금보증 추천"
          cont="한국주택금융공사에서 제공하는 전세보증 상품 추천 서비스"
           href="hf-api/hg-jnse-rcmd.html"
        />
        <Item
          title="은행별 전세대출 금리"
          cont="한국주택금융공사 보증서 담보 시중은행 대출의 고객 특성별 금리"
           href="hf-api/rent-loan-multi-info.html"
        />
      </div>
      <Footer/>
    </>
  )
}
