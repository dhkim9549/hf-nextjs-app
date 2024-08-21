import { useEffect, useState } from 'react';

import { getRtnData } from './get-data';
import ProdItem from './prod-item';

export default function ProdPanel({queryObj}) {

  let [rtnItems, setRtnItems] = useState();

  useEffect(() => {
    setRtnItems();
    getRtnData(queryObj).then((x) => {
      console.log("x = " + JSON.stringify(x));
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
        {rtnItems ? rtnItems.map(x =>
          <ProdItem prodObj={x} />
        ) : "no data"}
      </div>
    </div>
  )
}
