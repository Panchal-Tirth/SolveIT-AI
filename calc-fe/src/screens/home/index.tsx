import { useEffect, useRef, useState } from "react";
import { SWATCHES } from "@/constants";
import { ColorSwatch,Group, rgba } from "@mantine/core";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Draggable from 'react-draggable';

interface GeneratedResult{
    expression: string;
    answer: string;
}

interface Response{
    expr: string;
    result: string;
    assign: boolean;
}



export default function Home(){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing,setIsDrawing]=useState(false);
    const [color,setColor]=useState('rgb(255,255,255)');
    const [reset,setReset]=useState(false);
    const [latexExpression,setLatexExpression]=useState<Array<string>>([]);
    const [latexPosition,setLatexPosition]=useState({x:10,y:200});


    const [result,setResult]=useState<GeneratedResult>();
    const [dictOfVars,setDictOfVars]=useState({});



    useEffect(()=>{
        if(reset){
            resetCanvas();
            setLatexExpression([])
            setResult(undefined)
            setDictOfVars({})
            setReset(false);
        }
    },[reset]);
    

    useEffect(()=>{
        if(latexExpression.length>0 && window.MathJax){
            setTimeout(()=>{
                window.MathJax.Hub.Queue(["Typeset",window.MathJax.Hub]);
            },0)
        }
    },[latexExpression])

    useEffect(()=>{
        if(result){
            renderLatexToCanvas(result.expression,result.answer)
        }
    },[result])

    useEffect(()=>{
        const canvas=canvasRef.current;
        if(canvas){
            const context=canvas.getContext('2d');
            if(context){
                canvas.width=window.innerWidth;
                canvas.height=window.innerHeight-canvas.offsetTop;
                context.lineCap='round';
                context.lineWidth=3;    
            }
        }
        
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML";
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            window.MathJax.Hub.Config({
                tex2jax: { inlineMath: [['$', '$'], ['\\(', '\\)']] }
            });
        };


        return ()=>{
            document.head.removeChild(script);
        }
    },[]);

    const renderLatexToCanvas=(expression:string,answer:string)=>{
        const latex=`\\(\\LARGE{${expression}=${answer}}\\)`;
        setLatexExpression([...latexExpression,latex]); 

        const canvas=canvasRef.current;
        if(canvas){
            const context=canvas.getContext('2d');
            if(context){
                context.clearRect(0,0,canvas.width,canvas.height);
            }
        }
    };

    const sendData=async ()=>{
        const canvas=canvasRef.current;
        
        if(canvas){
            const response = await axios.post(
                
                `${import.meta.env.VITE_API_URL}/calculate`,
                {
                    image: canvas.toDataURL('image/png'),
                    dict_of_vars: dictOfVars,
                }
            );
            
            const resp=response.data;
            console.log("Response : ",resp);
            resp.data.forEach((data:Response) => {
                if(data.assign){
                    setDictOfVars({
                        ...dictOfVars,
                        [data.expr]:data.result
                    })
                }
            });

            const ctx = canvas.getContext('2d');
            const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height);
            let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;

            for (let y = 0; y < canvas.height; y++) {
                for (let x = 0; x < canvas.width; x++) {
                    const i = (y * canvas.width + x) * 4;
                    if (imageData.data[i + 3] > 0) {  // If pixel is not transparent
                        minX = Math.min(minX, x);
                        minY = Math.min(minY, y);
                        maxX = Math.max(maxX, x);
                        maxY = Math.max(maxY, y);
                    }
                }
            }

            const centerX = (minX + maxX) / 2;
            const centerY = (minY + maxY) / 2;

            setLatexPosition({ x: centerX, y: centerY });
            resp.data.forEach((data: Response) => {
                setTimeout(() => {
                    setResult({
                        expression: data.expr,
                        answer: data.result
                    });
                }, 1000);
            });
        }
     
    };

    const resetCanvas=()=>{
        const canvas=canvasRef.current
        if(canvas){
            const context=canvas.getContext("2d");
            if(context){
                context.clearRect(0,0,canvas.width,canvas.height);
            }
        }
    };

    const startDrawing=(e: React.MouseEvent<HTMLCanvasElement>)=>{
        const canvas=canvasRef.current;
        if(canvas){
            canvas.style.background="black"
            const context=canvas.getContext('2d')
            if(context){
                context.beginPath();
                context.moveTo(e.nativeEvent.offsetX,e.nativeEvent.offsetY);
                setIsDrawing(true)
            }
        }
    }


    const stopDrawing=()=>{
        setIsDrawing(false)
    }

    const draw=(e:React.MouseEvent<HTMLCanvasElement>)=>{
        if(!isDrawing){
            return;
        }

        const canvas =canvasRef.current;
        if(canvas){
        
            const context=canvas.getContext('2d')
            if(context){
                context.strokeStyle=color;
                context.lineTo(e.nativeEvent.offsetX,e.nativeEvent.offsetY);
                context.stroke();
                setIsDrawing(true)
            }
        }
    };
    return(
        <>
            <div className="grid grid-cols-3 gap-2">
                <Button
                    onClick={()=>{setReset(true)}}
                    className="z-20 bg-black text-white"
                    variant='default'
                    color="black"
                >Reset</Button>

                <Group className="z-20 top-11">
                    {SWATCHES.map((swatchColor: string)=>(
                        <ColorSwatch key={swatchColor} color={swatchColor} onClick={()=>{setColor(swatchColor)}}/>
                    ))}
                </Group>

                <Button
                    onClick={sendData}
                    className="z-20 bg-black text-white"
                    variant='default'
                    color="black"
                    >
                        Calculate
                </Button>

            </div>

            <canvas
            ref={canvasRef} 
            id='canvas'
            className="absolute top-0 left-0 w-full h-full"
            onMouseDown={startDrawing}
            onMouseOut={stopDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            />


            {latexExpression && latexExpression.map((latex, index) => (
                <Draggable
                    key={index}
                    defaultPosition={latexPosition}
                    onStop={(e, data) => setLatexPosition({ x: data.x, y: data.y })}
                >
                    <div className="absolute p-2 text-white rounded shadow-md">
                        <div className="latex-content">{latex}</div>
                    </div>
                </Draggable>
            ))}
        </>
        
    )
}