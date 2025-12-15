"use client";

import NavBar from "@/app/components/baseLayout";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { useState } from "react";
import { cards } from "@/shared/enums/home-modules";

export default function Page() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  return (
    <NavBar title="Home" arrowback={true}>
      <div className="p-8">
        <Typography sx={{ padding: 2 }} variant="h4" component="div">
          Seja Bem Vindo!!!
        </Typography>
        <div className="rounded-3xl bg-gray-100">
          <Typography sx={{ padding: 2 }} variant="h5" component="div">
            Modulos
          </Typography>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-0 p-4">
            {cards.map((card, index) => (
              <Card
                sx={{
                  borderRadius: 2,
                }}
                key={index}
              >
                <CardActionArea
                  onClick={() => setSelectedCard(index)}
                  data-active={selectedCard === index ? "" : undefined}
                  sx={{
                    height: "100%",
                    alignItems: "stretch",
                    backgroundColor: card.color,
                    opacity: 0.6,
                    "&[data-active]": {
                      backgroundColor: card.color,
                      opacity: 1,
                      boxShadow: "0 10px 0px green",
                      transform: "translateY(-5px)",
                    },
                    "&:hover:not([data-active])": {
                      backgroundColor: card.color,

                      opacity: 0.8,
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" color="white" component="div">
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="white">
                      {card.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </NavBar>
  );
}
