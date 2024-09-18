"use client";
import { Input } from "@/components/input";
import { Text } from "@/components/ui/text";

interface NicknameInputProps {
  nickname: string;
  onChange: (nickname: string) => void;
}

export const NicknameInput: React.FC<NicknameInputProps> = ({ nickname, onChange }) => {
  return (
    <div className="flex flex-col">
      <Input
        placeholder="닉네임"
        className="w-full"
        value={nickname}
        onChange={(e) => {
          if (e.target.value.length <= 20) {
            onChange(e.target.value);
          }
        }}
      />
      <Text variant="body2" className="mr-1 mt-1 self-end text-foreground-muted">
        {nickname.length}/20
      </Text>
    </div>
  );
};
