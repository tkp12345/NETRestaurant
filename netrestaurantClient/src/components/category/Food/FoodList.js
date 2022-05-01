import React, { useState } from "react";
import styled from "styled-components";

const FoodList = ({ currentPlace, list }) => {
  console.log(currentPlace);
  console.log(list);

  const [like, setLike] = useState(0);
  const [unlike, setUnLike] = useState(0);

  return (
    <Container>
      {list.length !== 0 && (
        <Ul>
          {list.map((v, index) => {
            return (
              <Li key={index}>
                <span>{v.place_name}</span>
                <div>
                  <LikeButton>👍 like</LikeButton> : {like}{" "}
                  <UnLikeButton>👎 unlike</UnLikeButton> : {unlike}
                </div>
              </Li>
            );
          })}
        </Ul>
      )}
    </Container>
  );
};

export default FoodList;

const Container = styled.div`
  width: 100%;
`;

const Ul = styled.ul`
  padding: 0;
  margin: 0px 10px;
`;
const Li = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
  margin-bottom: 8px;
  background: white;
  border-radius: 4px;
`;

const LikeButton = styled.button`
  border-radius: 4px;
  padding: 2px 6px;
  margin: 2px;
  background: #b2d8fb; //#3392ff;
  border: none;
  color: white;
  cursor: pointer;
`;

const UnLikeButton = styled.button`
  border-radius: 4px;
  padding: 2px 6px;
  margin: 2px;
  background: #fbbab2; //#ff4533;
  border: none;
  color: white;
  cursor: pointer;
`;
