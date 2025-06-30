import { useParams } from "react-router-dom"


export default function SingleCategory() {
    const { slug } = useParams()


    return (
        <div className="pt-20">SingleCategory</div>
    )
}
