import { useEffect, useState } from "react"

type Friend = {
  name: string;
  image: string;
};

export default function Pading() {
   const [pading, setPading] = useState<Friend[]>([]);
   
   //desenvolvimento, apagar quando for integrar com a API
   useEffect(() => {
       setPading([]);
       function addObject(name: string, image: string) {
        setPading(current => [...current, { name: name, image: image}]);
       }
       addObject('Eduardo8442', '/images/profile.png');
       addObject('RafaelStonks', '/images/profile.png');
   }, []);
    return(
        <div>
          <div className="mt-5 ml-5">
             <p className="geist text-white mb-5">Pendente - {pading.length}</p>

             {pading.map((friend, index) => (
            <div key={index}>
            <div className="inline-flex pl-4 rounded pb-2 pt-2 pr-4 items-center mt-5 hover:bg-gray-600">
              <img className="w-8 h-8  mr-2 rounded-full" src={friend.image}/>
              {friend.name}
              </div>
             
            </div>
        ))}

          </div>
        </div>
    )
}