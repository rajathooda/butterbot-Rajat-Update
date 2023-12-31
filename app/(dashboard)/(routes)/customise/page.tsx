"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ChromePicker } from "react-color";
import { Badge } from "@/components/ui/badge"; // make sure to import the Badge component
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";



import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField } from "@/components/ui/form";
import { Loader } from "@/components/loader";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { Music, Bot, MessageSquare } from "lucide-react";

const InputWithLabel = ({ label, children, style }) => {
  return (
    <div className="flex w-full items-center gap-1.5" style={style}>
      <Label className="font-normal">{label}</Label>
      {children}
    </div>
  );
};

const ColorPickerField = ({label, color, setColorPickerOpen, colorPickerOpen, field}) => (
  <div className="flex items-center space-x-4">
    <InputWithLabel label={label}>
      <div 
        onClick={() => setColorPickerOpen(!colorPickerOpen)}
        style={{
          display: 'inline-block',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: field.value,
          border: '1px solid #000',
          cursor: 'pointer'
        }}
      >
        {colorPickerOpen && (
          <ChromePicker color={field.value} onChange={(color) => field.onChange(color.hex)} />
        )}
      </div>
    </InputWithLabel>
  </div>
);
const defaultValues = {
    imageURL1: 'https://cdn.shopify.com/s/files/1/0793/8418/3092/files/boticonmain.png?v=1689692663',
    imageURL2: 'https://upload.wikimedia.org/wikipedia/commons/5/59/User-avatar.svg',
    imageURL3: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Icon_robot.svg',
    botMessageBackgroundColor: "#f7f8ff",
    botMessageTextColor: "#303235",
    userBackgroundMessageColor: "#3B81F6",
    userTextMessageColor: "#ffffff",
    widgetBackgroundColor: "#3B81F6",
    sendButtonColor: "#3B81F6",
    heightPixels: 700,
    widthPixels: 400,
    fontSize: 16,
    welcomeMessage: '',
    inputBoxText: '',
  };

const CustomizeBotPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [avatar1, setAvatar1] = useState(defaultValues.imageURL1);
  const [avatar2, setAvatar2] = useState(defaultValues.imageURL2);
  const [avatar3, setAvatar3] = useState(defaultValues.imageURL3);
  const [botMsgBgColorPickerOpen, setBotMsgBgColorPickerOpen] = useState(false);
  const [botMsgTextColorPickerOpen, setBotMsgTextColorPickerOpen] = useState(false);
  const [userBgMsgColorPickerOpen, setUserBgMsgColorPickerOpen] = useState(false);
  const [userTextMsgColorPickerOpen, setUserTextMsgColorPickerOpen] = useState(false);
  const [widgetBgColorPickerOpen, setWidgetBgColorPickerOpen] = useState(false);
  const [sendBtnColorPickerOpen, setSendBtnColorPickerOpen] = useState(false);
  const [heightPixels, setHeightPixels] = useState(700);
  const [widthPixels, setWidthPixels] = useState(400);
  const [fontSize, setFontSize] = useState(16);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [inputBoxText, setInputBoxText] = useState('');
  const [botName, setBotName] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);


  const form = useForm({
    defaultValues: {
      imageURL1: '',
      imageURL2: '',
      imageURL3: '',
      botMessageBackgroundColor: "#f7f8ff",
      botMessageTextColor: "#303235",
      userBackgroundMessageColor: "#3B81F6",
      userTextMessageColor: "#ffffff",
      widgetBackgroundColor: "#3B81F6",
      sendButtonColor: "#3B81F6",
      heightPixels: 700,
      widthPixels: 400,
      fontSize: 16,
      welcomeMessage: '',
      inputBoxText: '',
    },
  });
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const botNameFromUrl = urlParams.get('botName');
    setBotName(botNameFromUrl);
  }, []);
  

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const code = `<script type="module">
    import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js"
    Chatbot.init({
      chatflowid: "80dde17d-aa68-4816-8750-0ac1d90682ba",
      apiHost: "https://butterbot-ml2y.onrender.com",
      chatflowConfig: {
        pineconeNamespace: "${botName}",
      },
      theme: {
        button: {
          backgroundColor: "${values.widgetBackgroundColor}",
          customIconSrc: "${values.imageURL1}",
        },
        chatWindow: {
          welcomeMessage: "${values.welcomeMessage}",
          height: ${values.heightPixels},
          width: ${values.widthPixels},
          fontSize: ${values.fontSize},
          botMessage: {
            backgroundColor: "${values.botMessageBackgroundColor}",
            textColor: "${values.botMessageTextColor}",
            avatarSrc: "${values.imageURL3}",
          },
          userMessage: {
            backgroundColor: "${values.userBackgroundMessageColor}",
            textColor: "${values.userTextMessageColor}",
            avatarSrc: "${values.imageURL2}",
          },
          textInput: {
            placeholder: "${values.inputBoxText}",
            sendButtonColor: "${values.sendButtonColor}",
          }
        }
      }
    })
  </script>`;
    setGeneratedCode(code);
    setIsSheetOpen(true);  // Open the sheet
  } finally {
    setIsLoading(false);
  }
};
  

  return (
    <div>
      <div className="px-4 lg:px-8">
        {botName && (
          <Badge variant="outline" className="mx-auto mb-4">
            ButterBot Name: {botName}
          </Badge>
        )}
      </div>
      <Heading
        title="Customize Your Bot"
        description="Please enter the following details."
        icon={Bot}
        iconColor="text-orange-500"
        bgColor="bg-orange-500/10"
      />
      <div className="px-4 lg:px-8 space-y-4 mb-8"> {/* Add this div */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2 mb-8">
             <h2 className="text-xl font-semibold">Update Images</h2>
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  name="imageURL1"
                  render={({ field }) => (
                    <div className="flex items-center space-x-4">
                      <InputWithLabel label="Widget Avatar">
                      <Input {...field} placeholder="add image link here..." onChange={(event) => {
  setAvatar1(event.target.value);
  field.onChange(event);
}} />

                      </InputWithLabel>
                      <Avatar>
                        <AvatarImage src={avatar1} alt="avatar 1" />
                        <AvatarFallback>W</AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                />
                <FormField
                  name="imageURL2"
                  render={({ field }) => (
                    <div className="flex items-center space-x-4">
                      <InputWithLabel label="User Avatar">
                      <Input {...field} placeholder="add image link here..." onChange={(event) => {
  setAvatar2(event.target.value);
  field.onChange(event);
}} />
                      </InputWithLabel>
                      <Avatar>
                        <AvatarImage src={avatar2} alt="avatar 2" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                />
                <FormField
                  name="imageURL3"
                  render={({ field }) => (
                    <div className="flex items-center space-x-4">
                      <InputWithLabel label="Bot Avatar">
                      <Input {...field} placeholder="add image link here..." onChange={(event) => {
  setAvatar3(event.target.value);
  field.onChange(event);
}} />
                      </InputWithLabel>
                      <Avatar>
                        <AvatarImage src={avatar3} alt="avatar 3" />
                        <AvatarFallback>B</AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                />
              </div>
            </div>
              

          <fieldset className="space-y-2 mb-8">
          <h2 className="text-xl font-semibold">Select Colours</h2>
            <div className="grid grid-cols-3 gap-4">

              {/* Color Picker Fields */}
              <FormField
                name="botMessageBackgroundColor"
                render={({ field }) => (
                  <ColorPickerField
                    label="Bot Message Background Color"
                    color={field.value}
                    setColorPickerOpen={setBotMsgBgColorPickerOpen}
                    colorPickerOpen={botMsgBgColorPickerOpen}
                    field={field}
                  />
                )}
              />

              <FormField
                name="botMessageTextColor"
                render={({ field }) => (
                  <ColorPickerField
                    label="Bot Message Text Color"
                    color={field.value}
                    setColorPickerOpen={setBotMsgTextColorPickerOpen}
                    colorPickerOpen={botMsgTextColorPickerOpen}
                    field={field}
                  />
                )}
              />

              <FormField
                name="widgetBackgroundColor"
                render={({ field }) => (
                  <ColorPickerField
                    label="Widget Background Color"
                    color={field.value}
                    setColorPickerOpen={setWidgetBgColorPickerOpen}
                    colorPickerOpen={widgetBgColorPickerOpen}
                    field={field}
                  />
                )}
              />
              <FormField
                name="userBackgroundMessageColor"
                render={({ field }) => (
                  <ColorPickerField
                    label="User Background Message Color"
                    color={field.value}
                    setColorPickerOpen={setUserBgMsgColorPickerOpen}
                    colorPickerOpen={userBgMsgColorPickerOpen}
                    field={field}
                  />
                )}
              />


              
              
              <FormField
                name="userTextMessageColor"
                render={({ field }) => (
                  <ColorPickerField
                    label="User Text Message Color"
                    color={field.value}
                    setColorPickerOpen={setUserTextMsgColorPickerOpen}
                    colorPickerOpen={userTextMsgColorPickerOpen}
                    field={field}
                  />
                )}
              />

              <FormField
                name="sendButtonColor"
                render={({ field }) => (
                  <ColorPickerField
                    label="Send Button Color"
                    color={field.value}
                    setColorPickerOpen={setSendBtnColorPickerOpen}
                    colorPickerOpen={sendBtnColorPickerOpen}
                    field={field}
                  />
                )}
              />

              
              </div>
              </fieldset>

              <fieldset className="space-y-2 mb-8">
              <h2 className="text-xl font-semibold">Dimensions & Font</h2>
  <div className="grid grid-cols-3 gap-4 mb 8">
    <FormField
      name="heightPixels"
      render={({ field }) => (
        <div className="flex items-center space-x-4">
          <InputWithLabel label="Height (in pixels)">
            <Input type="number" {...field} />
          </InputWithLabel>
        </div>
      )}
    />

    <FormField
      name="widthPixels"
      render={({ field }) => (
        <div className="flex items-center space-x-4">
          <InputWithLabel label="Width (in pixels)">
            <Input type="number" {...field} />
          </InputWithLabel>
        </div>
      )}
    />

    <FormField
      name="fontSize"
      render={({ field }) => (
        <div className="flex items-center space-x-4">
          <InputWithLabel label="Font Size">
            <Input type="number" {...field} />
          </InputWithLabel>
        </div>
      )}
    />
  </div>
</fieldset>

<fieldset className="space-y-2 mb 8">
  <h2 className="text-xl font-semibold">Messages</h2>
  <div className="grid grid-cols-2 gap-4 mb-8">
    <FormField
      name="welcomeMessage"
      render={({ field }) => (
        <InputWithLabel label="Welcome Message" >
          <Input {...field} placeholder="enter the default welcome message..." />
        </InputWithLabel>
      )}
    />

    <FormField
      name="inputBoxText"
      render={({ field }) => (
        <InputWithLabel label="Textbox Message">
          <Input {...field} placeholder="enter the default textbox message..." />
        </InputWithLabel>
      )}
    />
  </div>
</fieldset>

<div className="mt-8">
  <Button type="submit" disabled={isLoading}>
    Generate Code
  </Button>
</div>

</form>
</Form>
{isLoading && (
  <div className="p-0">
    <Loader />
  </div>
)}
{generatedCode && (
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full max-w-4xl">
          <SheetHeader>
            <SheetTitle>Generated Code</SheetTitle>
            <SheetDescription>
              Here's your personal ButterBot embed code:
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4 p-0 text-left">
          <pre className="text-left whitespace-pre-wrap" style={{ fontSize: '10px' }}>{generatedCode}</pre>

          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button>Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    )}
</div>
</div>
);
};

export default CustomizeBotPage;
