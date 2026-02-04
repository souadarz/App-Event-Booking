import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { UserRole } from '@shared/enums/Role.enum';
import { UserRole } from '@shared/enums/Role.enum';
export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true, enum: Object.values(UserRole) })
  role!: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
