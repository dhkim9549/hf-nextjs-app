import { useEffect, useState } from 'react';
import { getRcmdProdData } from './get-data';
import GrntProdItem from './grnt-prod-item';

export default function ProdPanel({queryObj}) {

  let [rcmdItems, setRcmdItems] = useState();
  let [prodInfoMap, setProdInfoMap] = useState();
  let [maxRentAmtMap, setMaxRentAmtMap] = useState();

  useEffect(() => {
    setRcmdItems();
    getRcmdProdData(queryObj).then((x) => {
      setRcmdItems(x.rcmdItems);
      setProdInfoMap(x.prodInfoMap);
      setMaxRentAmtMap(x.maxRentAmtMap);
    });
  }, [queryObj]);

  return (
    <div>
      <div className="m-4 flex flex-wrap gap-3">
       {rcmdItems ? rcmdItems.map(x => 
         <GrntProdItem
           key={x.rcmdProrRnk}
           prodObj={x}
           prodInfo={prodInfoMap.get(x.grntDvcd)}
           maxRentAmtList={maxRentAmtMap.get(x.grntDvcd)}
         />
       ) : "loading..."}
      </div>
      {rcmdItems &&
        <div className="m-4 p-4">
          {rcmdItems.length} 건이 조회되었습니다.
        </div>
      }
    </div>
  )
}
