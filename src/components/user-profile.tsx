import { Avatar } from "./ui/avatar";
import { Heading } from "./ui/heading";

export interface UserProfileProps {
  image?: string;
  nickname: string;
  intro?: string;
}

export function UserProfile({ image, nickname, intro }: UserProfileProps) {
  return (
    <>
      <div className="flex flex-col items-center px-3 pt-12">
        <div>
          {image ? (
            <Avatar src={image} size={96} alt={nickname} className="rounded-full" />
          ) : (
            <span className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-background-muted text-2xl font-semibold">
              {nickname.slice(0, 2)}
            </span>
          )}
        </div>
        <Heading className="mt-4">{nickname}</Heading>
        {intro && <p className="mt-1.5 text-sm text-foreground">{intro}</p>}
      </div>
    </>
  );
}
