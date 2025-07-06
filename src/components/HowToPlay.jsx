import React from 'react';

const instructions = [
  {
    text: "Reveal a cell",
    image: "/img/${}",
  },
  {
    text: "Numbers indicate how many mines are around that cell",
    image: "/img/tutorial/number.png",
  },
  {
    text: "Right click on a cell to place a flag where you suspect there is a mine",
    image: "/img/tutorial/flag.png",
  },
  {
    text: "Reveal all the non-mine cells to win!",
    image: "/img/tutorial/win.png",
  },
];


export default function HowToPlay(props) {
    return (
        <div className="instructions-wrapper">
            {instructions.map((item, index) => (
                <InstructionItem 
                    number={index + 1} 
                    key={index}
                    text={item.text}
                    img={item.image}
                />
            ))}
        </div>
    )
}

function InstructionItem({ img, text, number }) {
  return (
    <div className="instruction-step">
      <div className="intructions-text--wrapper">
        <div className="instructions-number">
          <span>{number}</span>
        </div>
        <p>{text}</p>
      </div>
      <img src={`${import.meta.env.BASE_URL}/assets/${number}-step.png`} alt={`instruction ${number}`} className="instruction-img" />

    </div>
  );
}