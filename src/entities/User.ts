import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BeforeInsert,
	BeforeUpdate
} from "typeorm"
import { IsEmail } from "class-validator"
import bcrypt from "bcryptjs"

const BCRYPT_ROUNDS = 10

@Entity()
class User extends BaseEntity {
	@PrimaryGeneratedColumn() id: number

	@Column({ type: "text", nullable: true })
	@IsEmail()
	email: string | null

	@Column({ type: "boolean", default: false })
	verifiedEmail: boolean

	@Column({ type: "text" })
	firstName: string

	@Column({ type: "text" })
	lastName: string

	@Column({ type: "int", nullable: true })
	age: number

	@Column({ type: "text", nullable: true })
	password: string

	@CreateDateColumn({ type: "text" })
	createdAt: string

	@UpdateDateColumn({ type: "text" })
	updatedAt: string

	get fullName(): string {
		return `${this.firstName} ${this.lastName}`
	}

	public comparePassword(password: string = ""): Promise<boolean> {
		return bcrypt.compare(password, this.password)
	}

	private hashPassword(password: string): Promise<string> {
		return bcrypt.hash(password, BCRYPT_ROUNDS)
	}

	// save, update하기 전에 호출되는 메소드
	@BeforeInsert()
	@BeforeUpdate()
	async savePassword(): Promise<void> {
		if (this.password) {
			const hashedPassword = await this.hashPassword(this.password) // hash화 하는데 시간이 걸리므로 await 사용
			this.password = hashedPassword
		}
	}
}

export default User
