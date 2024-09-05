import { useEffect, useState } from 'react';

import { getRtnData } from './get-data';
import ProdItem from './prod-item';
import Skel from './skel';

export default function ProdPanel({queryObj, addAptList}) {

  let [rtnItems, setRtnItems] = useState();

  useEffect(() => {
    setRtnItems();
    getRtnData(queryObj).then((x) => {
      setRtnItems(x);
    });
  }, [queryObj]);

  return (
    <div>
      {rtnItems &&
        <div className="m-4 p-4">
          {rtnItems.length} 건이 조회되었습니다.
        </div>
      }
      <div className="m-4 flex flex-wrap gap-3">
        {rtnItems ?
          rtnItems.map(x =>
            <ProdItem key={Math.random()} prodObj={x} addAptList={addAptList}  />
          )
	  : <Skel />
	}
      </div>
    </div>
  )
}
